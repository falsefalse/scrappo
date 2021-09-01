order = orderDataResponse.orderData.salesOrders
  .map(order =>
    order.shippingPackages.map(pkg => [
      pkg.deliveryInfo.trackingNumber,
      pkg.deliveryInfo.shippingCarrier
    ])
  )
  .flat()
  .flat()

orderId = new URL(window.location).searchParams.get('purchaseOrderId')
params = [orderId, ...order]
url = `//%%APP_URL%%/add/${params.join('&')}`

i = new Image()
i.src = url
document.body.append(i)
window.location.replace(`#✅${order.join()}`)

/*

👇👇👇 copy this into your bookmark

%%MINIFIED%%

👆👆👆

*/
