import { useState } from 'react';
import Swal from 'sweetalert2';

const Seat = ({ i, step, columnStart, maxColumns, rowStart, maxRows, seatsTaken, buyHandler }) => {

    const handleSeatClick = async (seatNumber) => {
        // Check if the seat is already taken
        if (seatsTaken.find(seat => Number(seat) === seatNumber)) {
            // If seat is taken, display a warning using SweetAlert2
            Swal.fire({
                title: 'Seat Already Taken',
                text: 'Sorry, this seat has already been taken.',
                icon: 'warning'
            });
        } else {
            try {
                // Call the buyHandler function
                await buyHandler(seatNumber);
                // If purchase is successful, display success message using SweetAlert2
                Swal.fire({
                    title: 'NFT Bought!',
                    text: 'Your NFT has been successfully Bought.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                
                // Check if the error is due to insufficient funds
                if (error.message.includes('insufficient funds')) {
                    // Display a customized error message for insufficient funds using SweetAlert2
                    Swal.fire({
                        title: 'Insufficient Funds',
                        text: 'You do not have enough funds to complete the transaction.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                } else {
                    // Display a generic error message for other errors using SweetAlert2
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while processing your request. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        }
    };

    return (
        <div
            onClick={() => handleSeatClick(i + step)}
            className={seatsTaken.find(seat => Number(seat) === i + step) ? "occasion__seats--taken" : "occasion__seats"}
            style={{
                gridColumn: `${((i % maxColumns) + 1) + columnStart}`,
                gridRow: `${Math.ceil(((i + 1) / maxRows)) + rowStart}`
            }}
        >
            {i + step}
        </div>
    );
}

export default Seat;
