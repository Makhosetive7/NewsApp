import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFavoriteClick = (article) => {
    const isAlreadyFavorited = favorites.some(fav => fav.id === article.id);
    
    if (isAlreadyFavorited) {
      setFavorites(favorites.filter(fav => fav.id !== article.id));
      toast("Removed from favorites!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      setFavorites([...favorites, article]);
      toast("Added article to favorites!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const isFavorited = (articleId) => {
    return favorites.some(fav => fav.id === articleId);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          "https://api.spaceflightnewsapi.net/v4/articles/"
        );
        
        console.log("API Response:", response);
        
        if (response.data && Array.isArray(response.data.results)) {
          setArticles(response.data.results);
        } else if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        toast.error("Failed to load articles", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    
    getArticles();
  }, []);

  if (loading) {
    return (
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader>
          <PageTitle>
            <span>01</span>LATEST ARTICLES
          </PageTitle>
          <PageSubtitle>Exploring the cosmos through words</PageSubtitle>
        </PageHeader>
        <LoadingState>
          <LoadingSpinner />
          <LoadingText>Loading the latest space discoveries...</LoadingText>
        </LoadingState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader>
          <PageTitle>
            <span>01</span>LATEST ARTICLES
          </PageTitle>
          <PageSubtitle>Exploring the cosmos through words</PageSubtitle>
        </PageHeader>
        <ErrorState>
          <ErrorIcon>🚀</ErrorIcon>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>
            Try Again
          </RetryButton>
        </ErrorState>
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
          <span>01</span>LATEST ARTICLES
        </PageTitle>
        <PageSubtitle>Discover groundbreaking space discoveries and cosmic events</PageSubtitle>
      </PageHeader>

      <ArticlesGrid>
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleCard
              key={article.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ArticleImage>
                <img 
                  src={article.image_url || article.imageUrl} 
                  alt={article.title || "Spaceflight news"}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200' fill='none'%3E%3Crect width='400' height='200' fill='%23f1f5f9'/%3E%3Ccircle cx='200' cy='100' r='30' fill='%23e2e8f0'/%3E%3Cpath d='M180 80 L220 80 L220 120 L180 120 Z' fill='%23cbd5e1'/%3E%3C/svg%3E";
                  }}
                />
                <FavoriteButton
                  onClick={() => handleFavoriteClick(article)}
                  $isFavorited={isFavorited(article.id)}
                >
                  {isFavorited(article.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                </FavoriteButton>
              </ArticleImage>
              
              <ArticleContent>
                <ArticleSource>
                  {article.news_site || article.newsSite || "Unknown Source"}
                </ArticleSource>
                <ArticleTitle>
                  {article.title || "Untitled Article"}
                </ArticleTitle>
                <ArticleSummary>
                  {article.summary 
                    ? `${article.summary.substring(0, 120)}...`
                    : "No summary available."}
                </ArticleSummary>
                
                <ArticleActions>
                  <ReadMoreButton 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </ReadMoreButton>
                  <ArticleMeta>
                    {article.published_at && new Date(article.published_at).toLocaleDateString()}
                  </ArticleMeta>
                </ArticleActions>
              </ArticleContent>
            </ArticleCard>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>📰</EmptyIcon>
            <EmptyTitle>No Articles Found</EmptyTitle>
            <EmptyMessage>
              We couldn't find any articles at the moment. Please check back later for the latest space news.
            </EmptyMessage>
          </EmptyState>
        )}
      </ArticlesGrid>
      
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
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

const ArticlesGrid = styled.div`
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

const ArticleCard = styled(motion.article)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  }
`;

const ArticleImage = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ArticleCard}:hover & img {
    transform: scale(1.05);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${props => props.$isFavorited ? '#ef4444' : 'rgba(255, 255, 255, 0.9)'};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.$isFavorited ? 'white' : '#64748b'};
  font-size: 20px;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.$isFavorited ? '#dc2626' : '#1e40af'};
    color: white;
    transform: scale(1.1);
  }
`;

const ArticleContent = styled.div`
  padding: 24px;
`;

const ArticleSource = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  color: #1e40af;
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
`;

const ArticleTitle = styled.h3`
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

const ArticleSummary = styled.p`
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

const ArticleActions = styled.div`
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

const ArticleMeta = styled.span`
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

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  color: #475569;
  margin: 0 0 30px 0;
  max-width: 400px;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.3);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  grid-column: 1 / -1;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
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
  color: #475569;
  margin: 0;
  max-width: 400px;
`;

export default Articles;