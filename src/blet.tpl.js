tn = orderDataResponse.orderData.salesOrders
  .map(order =>
    order.shippingPackages.map(pkg => pkg.deliveryInfo.trackingNumber)
  )
  .flat()
  .join()

oid = new URL(window.location).searchParams.get('purchaseOrderId')
url = `%%APP_URL%%/add/${oid}&${tn}`

i = new Image()
i.src = url
document.body.append(i)
window.location.replace(`#✅${tn}`)

/*

👇👇👇 copy this into your bookmark

%%MINIFIED%%

👆👆👆

*/
