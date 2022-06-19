import React from 'react'
import { Card, Stack } from 'react-bootstrap';


function ProductCard({ product }) {

    return (
        <>
            <img src={`./../assets/images/${product.thumbnail}`} className="card-img-top" alt={product.name} />
            <Card.Body>
                <div className="text-center">
                    <Card.Title className="link-primary card-title pb-1"> {product.name} </Card.Title>
                    <Card.Text className="mb-4 text-muted"> {product.description !== undefined && product.description.split(" ").slice(0, 15).join(" ")} </Card.Text>
                </div>
                <div>
                    <Stack direction="horizontal" className="justify-content-between mb-2">
                        <span>تعداد موجودی</span>
                        <span> {
                            product.count > 0
                                ? `${product.count} عدد`
                                : "ناموجود"
                        } </span>
                    </Stack>
                    <Stack direction="horizontal" className="justify-content-between mb-2">
                        <span>برند</span><span> {product.brand} </span>
                    </Stack>
                </div>
                <Stack direction="horizontal" className="link-active justify-content-between fw-bold mt-4">
                    <span>قیمت</span><span> {`${product.price} تومان`} </span>
                </Stack>
            </Card.Body>

        </>
    )
}

export default ProductCard