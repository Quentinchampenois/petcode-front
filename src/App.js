import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer
} from "react-router-dom";
import {LoginPage} from "./Pages/Login";
import {HomePage} from "./Pages/Home";
import {Pet} from "./Pages/Pet";
import {ProfilePage} from "./Pages/Profile";
import {ProtectedLayout} from "./Components/ProtectedLayout";
import {HomeLayout} from "./Components/HomeLayout";
import "./index.css";
import {AuthLayout} from "./Components/AuthLayout";
import {SuspenseFallback} from "./Pages/SuspenseFallback";
import {EditProfile} from "./Pages/EditProfile";
import {RegisterPage} from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import {Create as CreatePet} from "./Pages/Pet/Create";
import {Edit as EditPet} from "./Pages/Pet/Edit";

const getUserData = () =>
    new Promise((resolve) => {
            setTimeout(() => {
                resolve(localStorage.getItem("user"));
            }, 500)
        }
    );

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout/>}
            loader={() => defer({userPromise: getUserData()})}
        >l
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Route>

            <Route path="/pet/:slug" element={<Pet/>}/>

            <Route path="/suspense" element={<SuspenseFallback/>}/>
            <Route path="/404" element={<NotFound/>}/>

            <Route path="/dashboard" element={<ProtectedLayout/>}>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="create" element={<CreatePet/>}/>
                <Route path="edit/:slug" element={<EditPet/>}/>
                <Route path="edit/profile" element={<EditProfile/>}/>
            </Route>
        </Route>
    )
);
