import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

const WhatsappWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dots, setDots] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typing effect when opening the widget
  useEffect(() => {
    let typingTimeout;
    if (isOpen && !showMessage) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setShowMessage(true);
      }, 2000); // Show typing for 2 seconds
    }
    return () => clearTimeout(typingTimeout);
  }, [isOpen]);

  // Dots animation
  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.whatsapp-widget-container')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Calculate responsive dimensions
  const isMobile = windowWidth <= 768;
  const widgetWidth = isMobile ? '300px' : '350px';
  const widgetHeight = isMobile ? '400px' : '450px';

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
      className="whatsapp-widget-container"
    >
      {isOpen && (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: widgetWidth,
          maxWidth: '90vw',
          overflow: 'hidden',
          transform: 'scale(1)',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          height: widgetHeight,
          maxHeight: '80vh',
          marginBottom: isMobile ? '60px' : '0',
        }}>
          {/* WhatsApp Header */}
          <div style={{
            backgroundColor: '#075e54',
            padding: '12px',
            color: 'white',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img 
                  src={logo} 
                  alt="Arsa Logo" 
                  style={{ 
                    width: '32px', 
                    height: '24px', 
                  }} 
                />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>Arsa Gipser</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {isTyping ? 'schreibt' + dots : 'Online'}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div style={{
            padding: '12px',
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEVHcEzx8fHw8PDw8PDw8PDw8PDw8PDw8PDw8PDJRRl3AAAACHRSTlMAGhgwLS8/Ozr7LZAAAABsSURBVDjLY2AYBQM+DPF/gIT8Hwx+MPAOGD6A0v+HgQ8FBD4wMHyA0v+cgfE/A8MHmHwDWOoDWOoDrB4m/wEs/wEm/wEmD1L/Aaz+A0z9B7D6DzD1H8Dq0eVh9gP1g+2H+wdqPwwAALJWvPypxXIqAAAAAElFTkSuQmCC")`,
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
            gap: '12px', // Increased gap
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
                fontSize: '14px',
                width: isMobile ? 'calc(100% - 60px)' : '100%', // Adjust width on mobile
                maxWidth: isMobile ? '200px' : 'none' // Limit max width on mobile
              }}
            />
            <button
              onClick={() => {
                if (inputMessage.trim()) {
                  window.open(`https://wa.me/41796590245?text=${encodeURIComponent(inputMessage)}`, '_blank');
                }
              }}
              style={{
                backgroundColor: '#128C7E',
                border: 'none',
                borderRadius: '50%',
                width: isMobile ? '45px' : '35px', // Slightly larger on mobile
                height: isMobile ? '45px' : '35px', // Slightly larger on mobile
                minWidth: isMobile ? '45px' : '35px', // Ensure minimum width on mobile
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                marginLeft: 'auto' // Push button to the right
              }}
            >
              <svg 
                width={isMobile ? "24" : "20"} 
                height={isMobile ? "24" : "20"} 
                viewBox="0 0 24 24" 
                fill="white"
                style={{
                  marginLeft: isMobile ? '2px' : '0', // Small alignment adjustment for mobile
                }}
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#25D366', // Lighter WhatsApp green
          border: 'none',
          borderRadius: '50%',
          padding: isMobile ? '12px' : '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'scale(1.1)' : 'scale(1)',
          width: isMobile ? '50px' : '60px',
          height: isMobile ? '50px' : '60px',
          position: 'relative',
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp"
          style={{ 
            width: isMobile ? '26px' : '32px', 
            height: isMobile ? '26px' : '32px' 
          }}
        />
        {!isOpen && <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>1</span>}
      </button>
    </div>
  );
};

// Add this to your CSS file or style tag
const styles = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @media (max-width: 768px) {
    .whatsapp-widget-container {
      bottom: 10px !important;
      right: 10px !important;
    }
  }
`;

// Add the styles to the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default WhatsappWidget;