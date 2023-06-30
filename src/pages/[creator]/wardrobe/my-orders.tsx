import { MainLayout } from "@/components/organisms/Layouts";
import { OrderCard } from "@/components/organisms/Product/OrderCard";
import React, {useEffect} from "react";
import { ordersRequestsActions } from "@/containers/wardrobe/actions/orders";
import {useArtist} from "../../../context";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import Loader from "../../../components/atoms/Loader";
import AuthMiddleware from "../../../middlewares/AuthMiddleware";

interface VideoCallRequestsProps {}

const WardrobeOrders: React.FC<VideoCallRequestsProps> = () => {

    const { id, profile, theme } = useArtist();
    const dispatch = useDispatch();

    const wardrobeOrders = useSelector((state: ApplicationState) => state.wardrobeOrders);

    useEffect(() => {
        if(id) {
            dispatch(ordersRequestsActions.ordersRequests(id, 1));
        }
    },[id]);

    console.log(wardrobeOrders);

    const getOrders = () => {
        return wardrobeOrders.orders.lists.map(item => {
            return (
                <OrderCard item={item} theme={theme} />
            )
        });
    }

    return (
        <MainLayout title="My Orders">
            <div className="call-requests header-footer-enabel">
                {wardrobeOrders.loading ? <Loader /> : getOrders() }
            </div>
        </MainLayout>
    );
};

export default AuthMiddleware(WardrobeOrders);
