tn = orderDataResponse.orderData.salesOrders
  .map(order =>
    order.shippingPackages.map(pkg => pkg.deliveryInfo.trackingNumber)
  )
  .flat()
  .join()

oid = new URL(window.location).searchParams.get('purchaseOrderId')
url = `https://nigguntry.ngrok.io/add/${oid}&${tn}`

i = new Image()
i.src = url
document.body.append(i)
window.location.replace(`#✅${tn}`)

// https://www.ebay.com/vod/FetchOrderDetails?ViewPaymentStatus&purchaseOrderId=25-0751-385029

// https://chriszarate.github.io/bookmarkleter/

/*

javascript:tn=orderDataResponse.orderData.salesOrders.map(a=>a.shippingPackages.map(a=>a.deliveryInfo.trackingNumber)).flat().join(),oid=new URL(window.location).searchParams.get("purchaseOrderId"),url=`https://nigguntry.ngrok.io/add/${oid}&${tn}`,i=new Image,i.src=url,document.body.append(i),window.location.replace(`#✅${tn}`);

*/
