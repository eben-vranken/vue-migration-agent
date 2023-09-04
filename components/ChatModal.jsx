import React, { useRef } from 'react';

const ChatModal = () => {

    // Use a ref to the modal content to check if a click occurred inside it
    const modalContentRef = useRef(null);

    const handleModalClick = (e) => {
        // Check if the click occurred outside the modal content
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            closeModal();
        }
    };

    const handleChat = (e) => {
        e.preventDefault()
    }

    return (
        <section className="absolute flex justify-center items-center inset-0 z-10 w-screen h-screen backdrop-blur" onClick={handleModalClick}>
            {/* Modal */}
            <form onSubmit={handleChat} className="flex flex-col justify-between z-20 w-9/12 h-[75%] bg-stone-900 border border-white/50 rounded-lg p-2 model-content" ref={modalContentRef}>
                {/* Messages */}
                <section>

                </section>
                {/* User Input */}
                <input type="text" name="" id="" className='p-2 py-3 rounded bg-stone-600' />
            </form>
        </section>
    )
}

export default ChatModal