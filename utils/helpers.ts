import Cookies from "js-cookie";

const formatPrice = (amt: number) => {
  if (amt >= 1000000000) {
    const newAmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    })
      .format(amt / 1000000000)
      .slice(3);
    return `${newAmt}B`;
  }
  if (amt >= 1000000) {
    const newAmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    })
      .format(amt / 1000000)
      .slice(3);
    return `${newAmt}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  })
    .format(amt)
    .slice(3);
};

const formatNum = (amt: number) => {
  if (amt >= 1000000000) {
    const newAmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    })
      .format(amt / 1000000000)
      .replace(/\D00(?=\D*$)/, "")
      .slice(3);
    return `${newAmt}B`;
  }
  if (amt >= 1000000) {
    const newAmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    })
      .format(amt / 1000000)
      .replace(/\D00(?=\D*$)/, "")
      .slice(3);
    return `${newAmt}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  })
    .format(amt)
    .replace(/\D00(?=\D*$)/, "")
    .slice(3);
};

const logout = () => {
  localStorage.clear();
  Cookies.remove("shopId");
  Cookies.remove("alphaShopId");
  Cookies.remove("hasShopRole");
  if(window.location.origin.includes("shopurban")) {
    Cookies.set("token", "", { path: '/', domain: process.env.NEXT_PUBLIC_DOMAIN, secure: true, sameSite: 'none' });
  } else {
    Cookies.remove("token");
  }

  return window.location.replace("/login");
  // return window.location.reload();
};

export {
  formatPrice,
  formatNum,
  logout
}
