'use client';

import { useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { fetchAllOrder } from "@/Services/orderService";
import { useFetch } from "@/Hook/useFetch";
import { Order } from "@/app/models/Order";

const OrdersPage: React.FC = () => {
    const [orderItem, setOrderItem] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;

    const { isFetching: isFetchingOrder, 
            fetchedData: orderData , 
            error: orderError } = useFetch<Order[]>(fetchAllOrder , []);
    
    useEffect(() => {
        if (orderData) {
            setOrderItem(orderData);
        }
    }, [orderData]);

    const handleViewDetails = (orderId: number) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleCloseDetails = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderItem.slice(indexOfFirstOrder, indexOfLastOrder);

    // Chuyển trang
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Tính tổng số trang
    const totalPages = Math.ceil(orderItem.length / ordersPerPage);

    return (
        <div className="">
            <div className="bg-white mb-3 py-3 pl-8">
                <FiShoppingBag className="my-3" size={35} />
                <h1 className="tracking-widest text-3xl font-bold">MY ORDERS</h1>
            </div>

            {orderItem.length === 0 ? (
                <div className="bg-white flex flex-col items-center py-6">
                    <p className="text-xl font-bold">You currently have no orders</p>
                    <p className="text-sm my-3 text-gray-700">Best get shopping ASOS pronto…</p>
                    <button className="bg-black text-white font-bold px-20 py-2">START SHOPPING</button>
                </div>
            ) : (
                <div className="bg-white px-6 rounded-xl">
                    {currentOrders.map((order, index) => (
                        <div key={order.id} className="flex justify-between items-center py-2 border-b">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-bold">Order #{order.id}</h2>
                                    <p className="text-sm text-gray-600">Total: ${order.totalPrice.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                                </div>
                            </div>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => handleViewDetails(order.id)}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Phân trang */}
            <div className="flex justify-center mt-6 items-center">
                <button 
                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">{currentPage} of {totalPages}</span>
                <button 
                    className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {/* Modal Chi tiết đơn hàng */}
            {isModalOpen && selectedOrderId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        {orderItem
                            .filter(order => order.id === selectedOrderId)
                            .map(order => (
                                <div key={order.id}>
                                    <div className="mb-4">
                                        <p className="font-semibold">Order #{order.id}</p>
                                        <p>Status: {order.status}</p>
                                        <p>Total: ${order.totalPrice.toFixed(2)}</p>
                                        <p>Payment Method: {order.paymentMethod}</p>
                                    </div>

                                    <div className="space-y-4">
                                        {order.orderItems.map(item => (
                                            <div key={item.id} className="flex gap-4 items-start">
                                                <img
                                                    src={item.productVariant.productImage}
                                                    alt={item.productVariant.productName}
                                                    className="w-20 h-20 object-cover rounded border"
                                                />
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-base">{item.productVariant.productName}</p>
                                                    <p className="text-sm text-gray-600">Color: {item.productVariant.color.color}, Size: {item.productVariant.size.size}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={handleCloseDetails}
                                    >
                                        Close
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}

        </div>
    );
}

export default OrdersPage;
