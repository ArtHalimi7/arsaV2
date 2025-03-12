import React, { useState, useEffect } from 'react';
import ReactWhatsapp from 'react-whatsapp';
import logo from '../assets/images/logo.png';

const WhatsappWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dots, setDots] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let typingTimeout;
    if (isHovered && !showMessage) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setShowMessage(true);
      }, 2000); // Show typing for 2 seconds
    }
    return () => clearTimeout(typingTimeout);
  }, [isHovered]);

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '10px'
      }}
    >
      {isHovered && (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '300px',
          overflow: 'hidden',
          transform: 'scale(1)',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          height: '400px',
        }}>
          {/* WhatsApp Header */}
          <div style={{
            backgroundColor: '#128c7e',
            padding: '12px',
            color: 'white',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <img 
                src={logo} 
                alt="Arsa Logo" 
                style={{ 
                  width: '40px', 
                  height: '30px', 
                }} 
              />
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>Arsa Gipser</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {isTyping ? 'schreibt' + dots : 'Online'}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div style={{
            padding: '12px',
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEVHcEzx8fHw8PDw8PDw8PDw8PDw8PDw8PDw8PDJRRl3AAAACHRSTlMAGhgwLS8/Ozr7LZAAAABsSURBVDjLY2AYBQM+DPF/gIT8Hwx+MPAOGD6A0v+HgQ8FBD4wMHyA0v+cgfE/A8MHmHwDWOoDWOoDrB4m/wEs/wEm/wEm/wEs/wEmD1L/Aaz+A0z9B7D6DzD1H8Dq0eVh9gP1g+2H+wdqPwwAALJWvPypxXIqAAAAAElFTkSuQmCC")`,
            backgroundColor: '#efeae2', // WhatsApp chat background color
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto'
          }}>
            {isTyping && (
              <div style={{
                backgroundColor: 'white',
                padding: '8px 12px',
                borderRadius: '8px 8px 8px 0',
                maxWidth: '85%',
                alignSelf: 'flex-start',
                fontSize: '14px',
                position: 'relative',
                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                minWidth: '60px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                  height: '20px'
                }}>
                  <span 
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#128C7E', // Darker green for dots
                      borderRadius: '50%',
                      animation: 'bounce 0.5s ease-in-out infinite',
                      animationDelay: '0s'
                    }}
                  />
                  <span 
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#128C7E', // Darker green for dots
                      borderRadius: '50%',
                      animation: 'bounce 0.5s ease-in-out infinite',
                      animationDelay: '0.1s'
                    }}
                  />
                  <span 
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#128C7E', // Darker green for dots
                      borderRadius: '50%',
                      animation: 'bounce 0.5s ease-in-out infinite',
                      animationDelay: '0.2s'
                    }}
                  />
                </div>
              </div>
            )}
            
            {showMessage && (
              <div style={{
                backgroundColor: 'white',
                padding: '8px 12px',
                borderRadius: '8px 8px 8px 0',
                maxWidth: '85%',
                alignSelf: 'flex-start',
                fontSize: '14px',
                position: 'relative',
                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)'
              }}>
                Hallo! Wie können wir Ihnen helfen? 🤝
                <div style={{ 
                  fontSize: '11px', 
                  color: '#667781',
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  {new Date().toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Message Input Area */}
          <div style={{
            padding: '12px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Nachricht schreiben..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={() => {
                if (inputMessage.trim()) {
                  window.open(`https://wa.me/1234567890?text=${encodeURIComponent(inputMessage)}`, '_blank');
                }
              }}
              style={{
                backgroundColor: '#128C7E', // Authentic WhatsApp green
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      <ReactWhatsapp 
        number="+1234567890"
        message="Hallo! Ich interessiere mich für Ihre Dienstleistungen."
        element="button"
        style={{
          backgroundColor: '#25D366', // Lighter WhatsApp green
          border: 'none',
          borderRadius: '50%',
          padding: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp"
          style={{ width: '32px', height: '32px' }}
        />
      </ReactWhatsapp>
    </div>
  );
};

// Add this to your CSS file or style tag
const styles = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

// Add the styles to the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default WhatsappWidget;