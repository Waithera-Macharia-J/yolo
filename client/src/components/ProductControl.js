import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import NewProductForm from './NewProductForm';
import ProductDetail from './ProductDetail';
import AddProduct from './AddProduct';
import EditProductForm from './EditProductForm';
import BACKEND_URL from '../config'; // centralized backend URL

class ProductControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            actualProductList: [],
            selectedProduct: null,
            editProduct: false,
            uploadPhoto: null
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get(`${BACKEND_URL}/api/products`)
            .then(res => this.setState({ actualProductList: res.data }))
            .catch(err => console.error('Error fetching products:', err));
    }

    handleEditProductClick = () => {
        this.setState({ editProduct: true });
    }

    handleAddButtonClick = (id) => {
        const BuyProduct = this.state.actualProductList.find(product => product._id === id);
        if (!BuyProduct) return;
        BuyProduct.quantity = BuyProduct.quantity - 1;
        if (BuyProduct.quantity <= 0) BuyProduct.quantity = "Product is not Available";
        this.setState({ selectedProduct: BuyProduct });
    }

    handleClick = () => {
        if (this.state.editProduct) {
            this.setState({ editProduct: false });
        } else if (this.state.selectedProduct) {
            this.setState({ formVisibleOnPage: false, selectedProduct: null });
        } else {
            this.setState(prevState => ({ formVisibleOnPage: !prevState.formVisibleOnPage }));
        }
    }

    handleAddingNewProduct = (newProduct) => {
        axios.post(`${BACKEND_URL}/api/products`, newProduct)
            .then(res => {
                const addedProduct = res.data;
                this.setState(prevState => ({
                    actualProductList: [...prevState.actualProductList, addedProduct],
                    formVisibleOnPage: false
                }));
            })
            .catch(err => console.error('Error adding product:', err));
    }

    handleDeletingProduct = (id) => {
        axios.delete(`${BACKEND_URL}/api/products/${id}`)
            .then(res => {
                this.setState(prevState => ({
                    actualProductList: prevState.actualProductList.filter(product => product._id !== id),
                    formVisibleOnPage: false,
                    selectedProduct: null
                }));
            })
            .catch(err => console.error('Error deleting product:', err));
    }

    handleChangingSelectedProduct = (id) => {
        const selectedProduct = this.state.actualProductList.find(product => product._id === id);
        this.setState({ selectedProduct });
    }

    handleEditingProduct = (editedProduct) => {
        axios.put(`${BACKEND_URL}/api/products/${this.state.selectedProduct._id}`, editedProduct)
            .then(res => {
                this.setState(prevState => ({
                    actualProductList: prevState.actualProductList.map(product =>
                        product._id === res.data._id ? res.data : product
                    ),
                    editProduct: false,
                    formVisibleOnPage: false,
                    selectedProduct: res.data
                }));
            })
            .catch(err => console.error('Error editing product:', err));
    }

    render() {
        let currentlyVisibleState = null;
        let buttonText = null;

        if (this.state.editProduct) {
            currentlyVisibleState = <EditProductForm 
                product={this.state.selectedProduct} 
                onEditProduct={this.handleEditingProduct} 
            />;
            buttonText = "Back to Product Detail";
        } else if (this.state.selectedProduct) {
            currentlyVisibleState = <ProductDetail 
                product={this.state.selectedProduct} 
                onBuyButtonClick={this.handleAddButtonClick} 
                onDeleteProduct={this.handleDeletingProduct} 
                onEditProductClick={this.handleEditProductClick} 
            />;
            buttonText = "Back to product list";
        } else if (this.state.formVisibleOnPage) {
            currentlyVisibleState = <NewProductForm 
                onNewProductCreation={this.handleAddingNewProduct} 
            />;
            buttonText = "Back to product list";
        } else {
            currentlyVisibleState = <ProductList 
                productList={this.state.actualProductList} 
                onProductSelection={this.handleChangingSelectedProduct} 
            />;
            buttonText = "Add a product";
        }

        return (
            <React.Fragment>
                <AddProduct 
                    buttonText={buttonText} 
                    whenButtonClicked={this.handleClick} 
                />
                {currentlyVisibleState}
            </React.Fragment>
        );
    }
}

export default ProductControl;

