import {callService} from '../services';

export const joinCallActions = {
    joinCall,
    updateCall
};

function joinCall(video_id: any, params) {
    return callService.joinCall(video_id, params).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    });
}

function updateCall(id: any, params) {
    return callService.updateCall(id, params).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    });
}
