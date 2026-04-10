import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { products as fallbackProducts } from "../assets/assets";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const normalizedBackendUrl = backendUrl.replace(/\/+$/, "");
  const productListUrl = normalizedBackendUrl.endsWith("/api")
    ? `${normalizedBackendUrl}/product/list`
    : `${normalizedBackendUrl}/api/product/list`;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState(fallbackProducts);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } },
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item]) {
          totalCount += cartItems[items][item];
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }

          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          /* empty */
        }
      }
    }
    return totalAmount;
  };

  const getProductData = useCallback(async () => {
    try {
      const response = await axios.get(productListUrl);
      if (response.data.success) {
        const apiProducts = Array.isArray(response.data.products)
          ? response.data.products
          : [];

        // Keep fallback catalog visible while still surfacing DB products.
        const mergedProductsMap = new Map();
        fallbackProducts.forEach((item) => {
          const key =
            item._id || `${item.name}-${item.category}-${item.subCategory}`;
          mergedProductsMap.set(key, item);
        });
        apiProducts.forEach((item) => {
          const key =
            item._id || `${item.name}-${item.category}-${item.subCategory}`;
          mergedProductsMap.set(key, item);
        });

        setProducts(Array.from(mergedProductsMap.values()));
      } else {
        toast.error(
          response.data.message ||
          "Invalid product response. Showing local products.",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to load products. Showing local products.",
      );
    }
  }, [productListUrl]);

  const getUserCart = useCallback(async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token: userToken } },
      );
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }

  }, [backendUrl]);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUserCart(token);
    }
  }, [token, getUserCart]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProductData();
  }, [getProductData]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
    // your shared state and functions here
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopProvider;
