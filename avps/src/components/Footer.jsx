// Footer.jsx

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p>&copy; {new Date().getFullYear()} AVPS. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        {/* <a href="#" className="hover:underline">
                            Privacy Policy
                        </a> */}
                        <a href="https://github.com/anandnair10/AVPS" className="hover:underline">
                            Terms of Service
                        </a>
                        <a href="#" className="">
                            <p>Ph: +91 94951 21351</p>
                        </a>
                        <a href="#" className="">
                             <p>e-mail: kte21cs017@cet.ac.in</p>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
