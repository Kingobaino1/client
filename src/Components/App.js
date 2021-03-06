import { Component } from 'react';
import LeftNav from './LeftNav';
import MiddleNav from './MiddleNav';
import RightNav from './RightNav';
import { connect } from 'react-redux';
import Loading from './loading';
import Product from './Product';
import Cart from './Cart';
import All from './All';
import { Container } from './styles/Container.style';

class App extends Component {

  render() {
    this.cat = this.props.category.data;
    this.state1 = this.props.allProducts.data.categories;
    this.set = this.props.cate.category
    if (this.cat && this.state1) {
      return (
        <Container>
          <div className='nav d-flex w'>
            <LeftNav />
            <MiddleNav />
            <RightNav />   
          </div>
          { (this.props.cate.category) ? 
          (this.set === 'cart')? <Cart />:
          (this.set === 'pdp')? <Product key='pdp'/>:
            this.state1.map((item) => {
              if(item.name !== this.set) return null
              return(
                <All new={this.set} key={item.name} name={item.name.toUpperCase()} />
              )
            }): 
            <All new='all' name='ALL' />
          }
        </Container>
      );
    };
    return (
      <div>
        <Loading />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    category: state.categoryReducer,
    cate:state.currentCategoryReducer.category,
    allProducts: state.allProductReducer,
    productPage: state.productReducer.data.data,
    currency: state.currencyReducer.label,
    dropDown: state.dropDownReducer.hover,
  };
};

export default connect(mapStateToProps)(App);
