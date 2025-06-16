const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1/products`;

export const fetchPopular = async () => {
  const res = await fetch(
    `${API_BASE_URL}?limitItems=10&sortKey=createdAt&sortValue=asc`
  );
  const data = await res.json();
  return data.info;
};
