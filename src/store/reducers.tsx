import {combineReducers} from "redux";
import CreatorPhotoReducer from "@/containers/albums/reducers/index";
import HomeReducer from "@/containers/home/reducers/index";
import CreatorVideoReducer from "@/containers/videos/reducers";
import MenuReducer from "@/containers/menu/reducers";
import ProfileReducer from "@/containers/profile/reducers";
import UpdateProfileReducer from "@/containers/profile/reducers/update";
import RechargeReducer from "@/containers/transactions/reducers/recharge";
import WalletReducer from "@/containers/transactions/reducers/wallet";
import UIReducer from "@/containers/ui/reducers/index";
import OrderReducer from "@/containers/transactions/reducers/show";
import UpcomingLiveReducer from "@/containers/live/reducers/upcoming";
import GiftReducer from "@/containers/live/reducers/gift";
import VideoCallRequestReducer from "@/containers/call/reducers/requests";
import MessageReducer from "@/containers/directline/reducers";
import WardrobeListingReducer from "@/containers/wardrobe/reducers";
import GreetingRequestReducer from "@/containers/fanobyte/reducers/requests";
import WardrobeOrdersReducer from "@/containers/wardrobe/reducers/orders";
import CommentReducer from "@/containers/comments/reducers/index";

export interface ApplicationState {
    creatorPhotos: any;
    home: any;
    creatorVideos: any;
    menu: any;
    profile: any;
    updateProfile: any;
    passbook: any;
    recharge: any;
    ui: any;
    orders: any;
    upcomingLive : any,
    gift: any;
    calls: any;
    messages: any;
    products: any;
    greetingsRequests: any;
    wardrobeOrders: any;
    comments: any;
}

export default combineReducers({
    creatorPhotos: CreatorPhotoReducer,
    home: HomeReducer,
    creatorVideos: CreatorVideoReducer,
    menu: MenuReducer,
    profile: ProfileReducer,
    updateProfile: UpdateProfileReducer,
    passbook: WalletReducer,
    recharge: RechargeReducer,
    ui: UIReducer,
    orders: OrderReducer,
    upcomingLive: UpcomingLiveReducer,
    gift: GiftReducer,
    calls: VideoCallRequestReducer,
    messages: MessageReducer,
    products: WardrobeListingReducer,
    greetingsRequests: GreetingRequestReducer,
    wardrobeOrders : WardrobeOrdersReducer,
    comments: CommentReducer,
});
