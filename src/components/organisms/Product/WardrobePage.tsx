import React, {useEffect, useState} from "react";
import { CardTop, CardBottom } from "@/components/molecules/Product"
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import {useArtist} from "@/context/ArtistContext";
import {wardrobeActions} from "@/containers/wardrobe/actions";
import {useRouter} from "next/router";
import Loader from "@/components/atoms/Loader";
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";
import { ProductDetailPage } from "@/components/organisms/Product/ProductDetailPage";
import Button from "@/components/atoms/Button/Button";

export const WardrobePage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    let username =  router?.query?.creator;

    const products = useSelector(
        (state: ApplicationState) => state.products
    );

    const { id, profile, theme } = useArtist();
    const [element, setElement] = useState(null);
    const [record, setRecord] = useState('');

    useEffect(() => {
        const currentElement = element;
        const currentObserver = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    if(id) {
                        dispatch(wardrobeActions.fetchWardrobe(username, id));
                    }
                }
            },
            { threshold: 0.5 }
        );
        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [id, element]);

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "100%",
            padding: "0",
            height: "100%",
        },
    };

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal">
                <div>
                    <div className="modal-content">
                        <header style={{background: theme?.secondary_color}}>
                            <Button className="side-menu-btn" onClick={() => closeModal()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                                </svg>
                            </Button>
                            <h3 style={{color: theme?.primary_color}}>{record?.name}</h3>
                            <div className="user-btn"> </div>
                        </header>
                        <ProductDetailPage item={record} theme={theme} id={id} profile={profile} />
                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]);

    const displayProductDetail = (item) => {
        setRecord(item);
        openModal();
    }

    const getProducts = () => {
        return products[username as string]?.products.map(item => {
            return (
                <>
                    <div className="product-set" onClick={(e) =>  displayProductDetail(item)}>
                        <CardTop item={item} />
                        <CardBottom item={item} />
                    </div>
                </>
            )
        });
    }

    return (
        <>
            <div className="container">
                <div className="wardrabe-section">
                    {products.loading ? <Loader /> : getProducts() }
                    <span ref={setElement} />
                </div>
            </div>
        </>
    );
}



