let userInfoGlobal = {};
$(document).ready(function () {
    console.log("ready!");


    let activeClass = `menu-item menu-item-open menu-item-here menu-item-submenu menu-item-rel menu-item-open menu-item-here`;
    let inactiveClass = `menu-item menu-item-submenu menu-item-rel`

    let locationUrl = window.location.pathname;

    $('.cust-header-main-menu').removeClass(activeClass);
    $('.cust-header-main-menu').addClass(inactiveClass);
    $(`.menu-link[href="${locationUrl}"]`).parent('.cust-header-main-menu').removeClass(inactiveClass);
    $(`.menu-link[href="${locationUrl}"]`).parent('.cust-header-main-menu').addClass(activeClass);

    getUserProfile();
});


async function getUserProfile() {
    const result = (await postAPIService('/employees/get-profile', {})).data;
    userInfoGlobal = result;
    if (!result) {
        return userSignOutClick();
    }

    $('.headerSignInUserName').text(result.name);
   

    if (result.profile_pic) {
        $('.headerSignInUserImage').attr('src', `/${result.profile_pic}`);
    }


    $(`.header-search-bar`).attr('placeholder', `Search ${userInfoGlobal.company_name} candidates...`);

}


async function sendAdminRequest() {
    let sure = confirm(`Are you sure? you want to send admin request.`);
    if (!sure) { return; }
    const result = await postAPIService(`/employees/update`, { admin_request: 'pending' });
    if (!result.data) {
        return errorToast(result.message);
    }
    successToast(`Request sent successfully`);
    getUserProfile();
}

async function userSignOutClick() {
    const result = await postAPIService(`/employees/logout`, {});

    if (result && result.statusType == 'success') {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    } else {
        errorToast(result.message);
    }
}



function loaderStart() {
    $(`.theme-loader`).show();
}

function loaderStop() {
    $(`.theme-loader`).hide();
}