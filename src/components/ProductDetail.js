import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart, isAuthenticated, custID, setIsAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : 'เกิดข้อผิดพลาด');
        setLoading(false);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate('/homepage');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productID === product.productID);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productID === product.productID ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${custID}`);
    handleMenuClose();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/signin');
    handleMenuClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!product) return <Alert severity="warning">ไม่พบข้อมูลสินค้า</Alert>;

  return (
    <div>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <img src="logo.webp" alt="Shopdee Logo" style={{ height: 50, marginRight: 16 }} />
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              background: "white",
              borderRadius: 4,
              padding: "2px 10px",
            }}
          >
            <SearchIcon style={{ marginRight: 8, color: "gray" }} />
            <InputBase
              placeholder="ค้นหาสินค้า..."
              style={{ flexGrow: 1 }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <IconButton color="inherit" sx={{ marginLeft: 2 }} onClick={() => navigate('/cart')}>
            <Badge badgeContent={cart.reduce((total, item) => total + item.quantity, 0)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {isAuthenticated && (
            <>
              <IconButton color="inherit" sx={{ marginLeft: 2 }} onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfileClick}>ดูโปรไฟล์</MenuItem>
                <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Product Detail */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:4000/api/product/image/${product.imageFile}`}
            alt={product.productName}
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {product.productDetail}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ราคา: {product.price} บาท
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => addToCart(product)}
            >
              เพิ่มลงตะกร้า
            </Button>
            <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={handleBackClick}>
              ย้อนกลับ
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default ProductDetail;