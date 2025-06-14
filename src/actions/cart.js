import axiosInstance from '../untils/axiosInstance';
import isEqual from 'lodash/isEqual';

export const fetchCart = () => async (dispatch, getState) => {
  dispatch({ type: 'CART_LOADING' });
  try {
    const res = await axiosInstance.get('/api/v1/cart');
    const serverCart = res.data.data;
    const currentCart = getState().cartReducer.items || [];

    if (serverCart.length !== currentCart.length || !isEqual(serverCart, currentCart)) {
      dispatch({ type: 'FETCH_CART_SUCCESS', payload: serverCart });
    }
  } catch (err) {
    console.error('Fetch cart failed', err);
  } finally {
    dispatch({ type: 'CART_DONE' });
  }
};

export const addToCart = (productID, quantity = 1) => async (dispatch, getState) => {
  dispatch({ type: 'CART_LOADING' });

  const prevCart = getState().cartReducer.items || [];

  const updatedCart = (() => {
    const existing = prevCart.find(item => item.productID._id === productID);
    if (existing) {
      return prevCart.map(item =>
        item.productID._id === productID
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    return [...prevCart, { productID: { _id: productID }, quantity }];
  })();

  dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: updatedCart });

  try {
    const res = await axiosInstance.post('/api/v1/cart/add', { productID, quantity });
    const serverCart = res.data.data;

    dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: serverCart });
  } catch (err) {
    console.error('Add to cart failed', err);
    dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: prevCart }); // rollback
    const message = err.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  } finally {
    dispatch({ type: 'CART_DONE' });
  }
};

export const updateQuantity = (productID, quantity) => async (dispatch, getState) => {
  dispatch({ type: 'CART_LOADING' });

  const prevCart = getState().cartReducer.items || [];

  const optimisticCart = prevCart.map(item =>
    item.productID._id === productID ? { ...item, quantity } : item
  );

  dispatch({ type: 'UPDATE_CART_SUCCESS', payload: optimisticCart });

  try {
    const res = await axiosInstance.put('/api/v1/cart/update', { productID, quantity });
    const serverCart = res.data.data;

    if (serverCart.length !== optimisticCart.length || !isEqual(serverCart, optimisticCart)) {
      dispatch({ type: 'UPDATE_CART_SUCCESS', payload: serverCart });
    }

  } catch (err) {
    console.error('Update failed', err);
    dispatch({ type: 'UPDATE_CART_SUCCESS', payload: prevCart }); // rollback
  } finally {
    dispatch({ type: 'CART_DONE' });
  }
};

export const deleteItem = (productID) => async (dispatch, getState) => {
  dispatch({ type: 'CART_LOADING' });

  const prevCart = getState().cartReducer.items || [];

  const updatedCart = prevCart.filter(item => item.productID._id !== productID);
  dispatch({ type: 'DELETE_CART_ITEM', productID });

  try {
    const res = await axiosInstance.delete('/api/v1/cart/delete', {
      data: { productID }
    });

    const serverCart = res.data.data;

    if (serverCart.length !== updatedCart.length || !isEqual(serverCart, updatedCart)) {
      dispatch({ type: 'FETCH_CART_SUCCESS', payload: serverCart });
    }

  } catch (err) {
    console.error('Delete cart item failed', err);
    dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: prevCart }); // rollback
  } finally {
    dispatch({ type: 'CART_DONE' });
  }
};

export const deleteAll = () => async (dispatch, getState) => {
  dispatch({ type: 'CART_LOADING' });

  const prevCart = getState().cartReducer.items || [];

  dispatch({ type: 'CLEAR_CART' });

  try {
    await axiosInstance.delete('/api/v1/cart/clear');

    dispatch({ type: 'FETCH_CART_SUCCESS', payload: [] });

  } catch (err) {
    console.error('Clear cart failed', err);
    dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: prevCart }); // rollback
  } finally {
    dispatch({ type: 'CART_DONE' });
  }
};
