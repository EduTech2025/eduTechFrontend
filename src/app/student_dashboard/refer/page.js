'use client';
import {  useState, useEffect, useRef } from 'react';
import { Share2, Mail, Link, LinkMail, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ReferLink({ collapsed })  {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const popupRef = useRef(null);
  const pathname = usePathname(); 
  const isActive = (href) => pathname === href;

  useEffect(() => {
    setReferralLink(`${window.location.origin}/invite?ref=USER123`); // Replace USER123 with dynamic code
  }, []);

  useEffect(() => {
    const handleClickOutside = (event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    });

    const handleEscapeKey = (event => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
      }
    });

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isPopupOpen]);

  const handleReferClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const shareViaEmail = () => {
    const subject = 'Join me on this awesome platform!';
    const body = `Hey! Check out this platform using my referral link: ${referralLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaSocial = (platform) => {
    let shareUrl = '';
    const message = 'Join me on this awesome platform!';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <>
      <a
        href="#"
        onClick={handleReferClick}
        className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/refer') ? 'bg-white/10' : 'hover:bg-white/5'}`}
      >
        <Share2 size={20} />
        {!collapsed && <span className="truncate">Refer</span>}
      </a>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Share Your Referral</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={shareViaEmail}
                className="w-full flex items-center space-x-2 p-3 bg-white/10 rounded hover:bg-white/20 transition"
              >
                <Mail size={20} />
                <span>Share via Email</span>
              </button>
              <button
                onClick={copyReferralLink}
                className="w-full flex items-center space-x-2 p-3 bg-white/10 rounded hover:bg-white/20 transition"
              >
                <Link size={20} />
                <span>Copy Referral Link</span>
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => shareViaSocial('twitter')}
                  className="flex-1 p-3 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Twitter
                </button>
                <button
                  onClick={() => shareViaSocial('facebook')}
                  className="flex-1 p-3 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareViaSocial('linkedin')}
                  className="flex-1 p-3 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}