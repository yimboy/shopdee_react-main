import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${id}`)
      .then((response) => {
        if (response.data.status) {
          setProduct(response.data.product);
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={`http://localhost:4000/api/product/image/${product.imageFile}`}
          alt={product.productName}
        />
        <CardContent>
          <Typography variant="h4">{product.productName}</Typography>
          <Typography variant="body1" color="textSecondary">
            {product.productDetail}
          </Typography>
          <Typography variant="h6" color="primary">
            ราคา: {product.price} บาท
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => addToCart(product)}
          >
            เพิ่มลงตะกร้า
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;