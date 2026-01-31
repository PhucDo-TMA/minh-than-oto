"use client";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a 
        href="https://www.tiktok.com/@otobinhtanminhthan" 
        target="_blank" 
        rel="noopener noreferrer"
        title="TikTok"
        className="social-icon tiktok"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-2.4-2.4c.34 0 .67.06 1 .15V9.48a6.5 6.5 0 1 0 5.85 6.48H15.38A4.83 4.83 0 0 0 19.59 6.69z"/>
        </svg>
      </a>

      <a 
        href="https://www.facebook.com/mientrung.haikhia.3" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Facebook"
        className="social-icon facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      <a 
        href="https://www.youtube.com/@MinhTh%C3%A2nCh%E1%BB%A3%C3%94t%C3%B4B%C3%ACnhT%C3%A2n" 
        target="_blank" 
        rel="noopener noreferrer"
        title="YouTube"
        className="social-icon youtube"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>

      <a 
        href="https://zalo.me/0936211276" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Zalo"
        className="social-icon zalo"
      >
        <span className="zalo-letter">Zalo</span>
      </a>

      <style jsx>{`
        .social-links {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 100;
          visibility: hidden;
          animation: fadeIn 0.3s ease-in 0.1s forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            visibility: hidden;
          }
          to {
            opacity: 1;
            visibility: visible;
          }
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          color: #1a1a1a;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          text-decoration: none;
          border: 2px solid transparent;
          position: relative;
          contain-intrinsic-size: 50px 50px;
          content-visibility: auto;
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .social-icon svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .social-icon.tiktok {
          background: #000;
          color: white;
          border-color: #000;
        }

        .social-icon.tiktok:hover {
          background: #1a1a1a;
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .social-icon.facebook {
          background: #1877f2;
          color: white;
          border-color: #1877f2;
        }

        .social-icon.facebook:hover {
          background: #0a66c2;
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 20px rgba(24, 119, 242, 0.4);
        }

        .social-icon.youtube {
          background: #ff0000;
          color: white;
          border-color: #ff0000;
        }

        .social-icon.youtube:hover {
          background: #cc0000;
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 20px rgba(255, 0, 0, 0.4);
        }

        .social-icon.zalo {
          background: #0084ff;
          color: white;
          border-color: #0084ff;
        }

        .social-icon.zalo:hover {
          background: #0073e6;
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 132, 255, 0.4);
        }

        .zalo-text {
          display: none;
        }

        .zalo-letter {
          font-size: 14px;
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .social-links {
            bottom: 1rem;
            right: 1rem;
          }

          .social-icon {
            width: 45px;
            height: 45px;
          }

          .social-icon svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
}
