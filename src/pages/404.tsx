import {useRouter} from "next/router";
import Routes from "@/constants/Routes";
import React from "react";

function NotFound() {

  const router = useRouter();
  const path = router?.asPath.split('/');
  return (
      <section className="error-page">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <figure className="error-img">
                {/*<img src={icons.not_found} alt="" />*/}
              </figure>
            </div>
            <div className="col-12 col-md-6">
              <div className="error-content">
                <h1>404</h1>
                <p>
                  It's just a 404 Error! What you're looking for may have been
                  misplaced in Long Term memory.
                </p>
                <small>Navigate to</small>
                <div className="error-btns">
                  <a onClick={()=> router.push(Routes.home(path[1]))} className="btn-primary" title="Home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path></svg>
                  </a>
                  {/* <a href="/creators" className="btn-primary" title="Creators">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10c1.151 0 2-.848 2-2s-.849-2-2-2c-1.15 0-2 .848-2 2s.85 2 2 2zm0 1c-2.209 0-4 1.612-4 3.6v.386h8V14.6c0-1.988-1.791-3.6-4-3.6z"></path><path d="M19 2H5c-1.103 0-2 .897-2 2v13c0 1.103.897 2 2 2h4l3 3 3-3h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-5 15-2 2-2-2H5V4h14l.002 13H14z"></path></svg>
                  </a>
                  <a
                    href={`${"/chat"}`}
                    className="btn-primary"
                    title="Creators"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path></svg>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>   
  );
}

export default NotFound;
