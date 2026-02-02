'use client';

import { useState } from 'react';
import { User, Heart, MessageCircle, Share2, Send, Plus, X } from 'lucide-react';
import { Post } from '../types';

interface CommunityScreenProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onAddPost: (content: string, image?: string) => void;
}

export default function CommunityScreen({ posts, onLike, onComment, onAddPost }: CommunityScreenProps) {
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCommentSubmit = (postId: string) => {
    const comment = commentInputs[postId];
    if (comment && comment.trim()) {
      onComment(postId, comment.trim());
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const handleNewPostSubmit = () => {
    if (newPostContent.trim()) {
      onAddPost(newPostContent.trim());
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Comunidade</h1>
          <button
            onClick={() => setShowNewPost(!showNewPost)}
            className="p-3 bg-[#FF6B35] rounded-full hover:bg-[#FF5520] transition-all"
          >
            {showNewPost ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Plus className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="mb-6 bg-white/5 rounded-2xl border border-white/10 p-4">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Compartilhe sua conquista..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-[#FF6B35] transition-all resize-none"
              rows={4}
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleNewPostSubmit}
                disabled={!newPostContent.trim()}
                className={`flex-1 py-3 rounded-full font-bold transition-all ${
                  newPostContent.trim()
                    ? 'bg-[#FF6B35] text-white hover:bg-[#FF5520]'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Publicar
              </button>
              <button
                onClick={() => {
                  setShowNewPost(false);
                  setNewPostContent('');
                }}
                className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {/* User Info */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF5520] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{post.user}</h3>
                  <p className="text-gray-400 text-sm">{post.time}</p>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-300 mb-3">{post.content}</p>
                {post.image && (
                  <div 
                    className="h-48 bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex items-center gap-6 border-t border-white/10 pt-4">
                <button 
                  onClick={() => onLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    post.liked ? 'text-[#FF6B35]' : 'text-gray-400 hover:text-[#FF6B35]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button 
                  onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments.length}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4 space-y-3">
                  {/* Existing Comments */}
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FF5520] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/5 rounded-2xl p-3">
                          <p className="text-white font-medium text-sm mb-1">{comment.user}</p>
                          <p className="text-gray-300 text-sm">{comment.content}</p>
                        </div>
                        <p className="text-gray-500 text-xs mt-1 ml-3">{comment.time}</p>
                      </div>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                      placeholder="Adicione um comentário..."
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-[#FF6B35] transition-all text-sm"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      className="p-3 bg-[#FF6B35] rounded-full hover:bg-[#FF5520] transition-all"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
