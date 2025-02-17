import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "@/views/Test";
import Layout from "@/align/Layout";
import AuthGoogleCallback from '@/api/AuthGoogleCallback';
import Home from "@/views/Home";
import Watch from "@/views/Watch";


const Router: React.FC = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="auth/google/callback" element={<AuthGoogleCallback />} />
                
                <Route path="/test" element={
                    <Test />
                } />

                <Route path="/" element={
                    <Layout>
                        <Home />
                    </Layout>
                } />

                <Route path="/watch/:videoId" element={
                    <Layout>
                        <Watch />
                    </Layout>
                } />
                

            </Routes>
        </BrowserRouter>
    </>)
}

export default Router
