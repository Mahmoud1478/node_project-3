import Navbar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Products from './pages/products';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import Provider from './store/StateProvider';
import Authenticated from './meddlewares/Authenticated';
import Users from './pages/users';
import Orders from './pages/orders';

const App = () => {
    return (
        <Provider>
            <Navbar />
            <Routes>
                <Route element={<Authenticated />}>
                    <Route path="/products" element={<Products />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/orders" element={<Orders />} />
                </Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
            </Routes>
            <Footer />
        </Provider>
    );
};

export default App;
