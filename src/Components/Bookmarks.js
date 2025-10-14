import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiFillDelete, AiOutlineFolderOpen } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookmarks = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      } catch (error) {
        console.error("Error parsing favorites:", error);
        setFavorites([]);
      }
    }
    setLoading(false);
  }, []);

  const deleteFromFavorites = (articleToDelete) => {
    // Use article ID for comparison if available, otherwise use title
    const newFavorites = favorites.filter(article => 
      article.id ? article.id !== articleToDelete.id : article.title !== articleToDelete.title
    );
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    toast.success("Removed from bookmarks!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const clearAllBookmarks = () => {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));
    toast.info("All bookmarks cleared!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader>
          <PageTitle>
            <span>04</span>SAVED BOOKMARKS
          </PageTitle>
          <PageSubtitle>Your personalized space news collection</PageSubtitle>
        </PageHeader>
        <LoadingState>
          <LoadingSpinner />
          <LoadingText>Loading your bookmarks...</LoadingText>
        </LoadingState>
      </Container>
    );
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <PageTitle>
          <span>04</span>SAVED BOOKMARKS
        </PageTitle>
        <PageSubtitle>
          Quick access to your saved articles, favorite blogs, and important reports
        </PageSubtitle>
        
        {favorites.length > 0 && (
          <BookmarkStats>
            <StatItem>
              <StatNumber>{favorites.length}</StatNumber>
              <StatLabel>Saved Items</StatLabel>
            </StatItem>
            <ClearButton onClick={clearAllBookmarks}>
              Clear All
            </ClearButton>
          </BookmarkStats>
        )}
      </PageHeader>

      {favorites.length > 0 ? (
        <BookmarksGrid>
          {favorites.map((article, index) => (
            <BookmarkCard
              key={article.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <BookmarkImage>
                <img 
                  src={article.image_url || article.imageUrl} 
                  alt={article.title || "Bookmarked article"}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200' fill='none'%3E%3Crect width='400' height='200' fill='%23f1f5f9'/%3E%3Cpath d='M180 80 L220 80 L220 120 L180 120 Z' fill='%23e2e8f0'/%3E%3Cpath d='M160 100 L240 100' stroke='%23cbd5e1' stroke-width='2'/%3E%3C/svg%3E";
                  }}
                />
                <DeleteButton
                  onClick={() => deleteFromFavorites(article)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiFillDelete />
                </DeleteButton>
              </BookmarkImage>
              
              <BookmarkContent>
                <BookmarkSource>
                  {article.news_site || article.newsSite || "Unknown Source"}
                </BookmarkSource>
                <BookmarkTitle>
                  {article.title || "Untitled Article"}
                </BookmarkTitle>
                <BookmarkSummary>
                  {article.summary 
                    ? `${article.summary.substring(0, 120)}...`
                    : "No summary available."}
                </BookmarkSummary>
                
                <BookmarkActions>
                  <ReadMoreButton 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Article
                  </ReadMoreButton>
                  <BookmarkMeta>
                    {article.published_at && new Date(article.published_at).toLocaleDateString()}
                  </BookmarkMeta>
                </BookmarkActions>
              </BookmarkContent>
            </BookmarkCard>
          ))}
        </BookmarksGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <AiOutlineFolderOpen />
          </EmptyIcon>
          <EmptyTitle>No Bookmarks Yet</EmptyTitle>
          <EmptyMessage>
            Save your favorite articles, blogs, and reports to see them here. 
            They'll be waiting for you whenever you need them.
          </EmptyMessage>
          <EmptyAction>
            Start exploring content to build your collection!
          </EmptyAction>
        </EmptyState>
      )}
      
      <ToastContainer />
    </Container>
  );
};

// Styled Components
const Container = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  min-height: 100vh;
  padding: 120px 10% 60px;

  @media (max-width: 768px) {
    padding: 100px 5% 40px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const PageTitle = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 28px;
  letter-spacing: 4.725px;
  color: #0f172a;
  text-transform: uppercase;
  margin-bottom: 16px;

  span {
    font-weight: 700;
    color: #1e40af;
    opacity: 0.5;
    margin-right: 28px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    letter-spacing: 3.375px;
    
    span {
      margin-right: 18px;
    }
  }
`;

const PageSubtitle = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  line-height: 32px;
  color: #475569;
  margin: 0 0 30px 0;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

const BookmarkStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.span`
  font-family: 'Bellefair', serif;
  font-size: 32px;
  color: #1e40af;
  font-weight: 400;
`;

const StatLabel = styled.span`
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ClearButton = styled.button`
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ef4444;
    color: white;
    transform: translateY(-1px);
  }
`;

const BookmarksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const BookmarkCard = styled(motion.article)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
  position: relative;

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  }
`;

const BookmarkImage = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${BookmarkCard}:hover & img {
    transform: scale(1.05);
  }
`;

const DeleteButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(239, 68, 68, 0.9);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  backdrop-filter: blur(10px);
  transition: background 0.3s ease;

  &:hover {
    background: #dc2626;
  }
`;

const BookmarkContent = styled.div`
  padding: 24px;
`;

const BookmarkSource = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  color: #1e40af;
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
`;

const BookmarkTitle = styled.h3`
  font-family: 'Bellefair', serif;
  font-size: 24px;
  line-height: 32px;
  color: #0f172a;
  margin: 0 0 12px 0;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

const BookmarkSummary = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #475569;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BookmarkActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReadMoreButton = styled.a`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.3);
  }
`;

const BookmarkMeta = styled.span`
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  color: #64748b;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #1e40af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  color: #475569;
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  color: #cbd5e1;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-family: 'Bellefair', serif;
  font-size: 32px;
  color: #0f172a;
  margin: 0 0 16px 0;
  font-weight: 400;
`;

const EmptyMessage = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #475569;
  margin: 0 0 20px 0;
`;

const EmptyAction = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  color: #64748b;
  font-style: italic;
  margin: 0;
`;

export default Bookmarks;