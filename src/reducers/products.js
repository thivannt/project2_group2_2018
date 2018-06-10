var initialState = [
    {
        id : 1,
        name : 'Iphone 7 Plus',
        img: 'https://www.didongviet.vn/pub/media/catalog/product//i/p/iphone-7-plus-128gb-quoc-te-didongviet.jpg',
        description : 'Là sản phẩm của apple sản xuất',
        price : 500,
        inventory : 10,
        rating: 4
    },
    {
        id: 2,
        name: 'Samsum galaxy S7',
        img: 'http://didongthongminh.vn/upload_images/2017/10/samsung-galaxy-s7-edge-pink.png',
        description: 'Là sản phẩm của Samsung sản xuất',
        price: 300,
        inventory: 2,
        rating: 2
    }
];

const Products = (state = initialState, action)=>{
    switch (action.type) {
        default: return [... state];
    }
}

export default Products;