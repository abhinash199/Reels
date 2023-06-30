import React from "react";
import { MainLayout} from "@/components/organisms/Layouts";
import { WardrobePage } from "@/components/organisms/Product/WardrobePage";

 const Wardrobe = () => {
    return (
        <MainLayout title={'Wardrobe'}>
                <WardrobePage/>
        </MainLayout>
    );
}

export default Wardrobe;
