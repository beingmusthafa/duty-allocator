// import React from 'react';
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Typography,
//     Button,
//     Input,
//     Chip,
//     Tabs,
//     TabsHeader,
//     Tab,
//     Avatar,
//     IconButton,
//     Tooltip,
// } from "@material-tailwind/react";

// const TABS = [
//     {
//         label: "All",
//         value: "all",
//     },
//     {
//         label: "Monitored",
//         value: "monitored",
//     },
//     {
//         label: "Unmonitored",
//         value: "unmonitored",
//     },
// ];

// const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

// const TABLE_ROWS = [];

// function Temp() {
//     return (
//         <Card className="h-full w-full">
//             <CardHeader floated={false} shadow={false} className="rounded-none">
//                 <div className="mb-8 flex items-center justify-between gap-8">
//                     <div>
//                         <Typography variant="h5" color="blue-gray">
//                             Members list
//                         </Typography>
//                         <Typography color="gray" className="mt-1 font-normal">
//                             See information about all members
//                         </Typography>
//                     </div>
//                     <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//                         <Button variant="outlined" size="sm">
//                             view all
//                         </Button>
//                         <Button className="flex items-center gap-3" size="sm">
//                             <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                     <Tabs value="all" className="w-full md:w-max">
//                         <TabsHeader>
//                             {TABS.map(({ label, value }) => (
//                                 <Tab key={value} value={value}>
//                                     &nbsp;&nbsp;{label}&nbsp;&nbsp;
//                                 </Tab>
//                             ))}
//                         </TabsHeader>
//                     </Tabs>
//                     <div className="w-full md:w-72">
//                         <Input
//                             label="Search"
//                             icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//                         />
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardBody className="overflow-scroll px-0">
//                 <table className="mt-4 w-full min-w-max table-auto text-left">
//                     <thead>
//                         <tr>
//                             {TABLE_HEAD.map((head) => (
//                                 <th
//                                     key={head}
//                                     className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//                                 >
//                                     <Typography
//                                         variant="small"
//                                         color="blue-gray"
//                                         className="font-normal leading-none opacity-70"
//                                     >
//                                         {head}
//                                     </Typography>
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {TABLE_ROWS.map(
//                             ({ img, name, email, job, org, online, date }, index) => {
//                                 const isLast = index === TABLE_ROWS.length - 1;
//                                 const classes = isLast
//                                     ? "p-4"
//                                     : "p-4 border-b border-blue-gray-50";

//                                 return (
//                                     <tr key={name}>
//                                         <td className={classes}>
//                                             <div className="flex items-center gap-3">
//                                                 <Avatar src={img} alt={name} size="sm" />
//                                                 <div className="flex flex-col">
//                                                     <Typography
//                                                         variant="small"
//                                                         color="blue-gray"
//                                                         className="font-normal"
//                                                     >
//                                                         {name}
//                                                     </Typography>
//                                                     <Typography
//                                                         variant="small"
//                                                         color="blue-gray"
//                                                         className="font-normal opacity-70"
//                                                     >
//                                                         {email}
//                                                     </Typography>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className={classes}>
//                                             <div className="flex flex-col">
//                                                 <Typography
//                                                     variant="small"
//                                                     color="blue-gray"
//                                                     className="font-normal"
//                                                 >
//                                                     {job}
//                                                 </Typography>
//                                                 <Typography
//                                                     variant="small"
//                                                     color="blue-gray"
//                                                     className="font-normal opacity-70"
//                                                 >
//                                                     {org}
//                                                 </Typography>
//                                             </div>
//                                         </td>
//                                         <td className={classes}>
//                                             <div className="w-max">
//                                                 <Chip
//                                                     variant="ghost"
//                                                     size="sm"
//                                                     value={online ? "online" : "offline"}
//                                                     color={online ? "green" : "blue-gray"}
//                                                 />
//                                             </div>
//                                         </td>
//                                         <td className={classes}>
//                                             <Typography
//                                                 variant="small"
//                                                 color="blue-gray"
//                                                 className="font-normal"
//                                             >
//                                                 {date}
//                                             </Typography>
//                                         </td>
//                                         <td className={classes}>
//                                             <Tooltip content="Edit User">
//                                                 <IconButton variant="text">
//                                                     <PencilIcon className="h-4 w-4" />
//                                                 </IconButton>
//                                             </Tooltip>
//                                         </td>
//                                     </tr>
//                                 );
//                             },
//                         )}
//                     </tbody>
//                 </table>
//             </CardBody>
//             <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//                 <Typography variant="small" color="blue-gray" className="font-normal">
//                     Page 1 of 10
//                 </Typography>
//                 <div className="flex gap-2">
//                     <Button variant="outlined" size="sm">
//                         Previous
//                     </Button>
//                     <Button variant="outlined" size="sm">
//                         Next
//                     </Button>
//                 </div>
//             </CardFooter>
//         </Card>
//     );
// }

// export default Temp;


import React from 'react';

class Temp extends React.Component {
    render() {
        return (
            <section className="sec-product-detail bg0 p-t-65 p-b-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-7 p-b-30">
                            {/* Image Slider */}
                            <div className="p-l-25 p-r-30 p-lr-0-lg">
                                {/* Image Slider */}
                                <div className="wrap-slick3 flex-sb flex-w">
                                    <div className="wrap-slick3-dots"></div>
                                    <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                                    <div className="slick3 gallery-lb">
                                        {/* Individual Slide */}
                                        <div className="item-slick3" data-thumb="images/product-detail-01.jpg">
                                            <div className="wrap-pic-w pos-relative">
                                                <img src="images/product-detail-01.jpg" alt="IMG-PRODUCT" />
                                                <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/product-detail-01.jpg">
                                                    <i className="fa fa-expand"></i>
                                                </a>
                                            </div>
                                        </div>
                                        {/* More slides go here */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-5 p-b-30">
                            {/* Product Details */}
                            <div className="p-r-50 p-t-5 p-lr-0-lg">
                                <h4 className="mtext-105 cl2 js-name-detail p-b-14">Lightweight Jacket</h4>
                                <span className="mtext-106 cl2">$58.79</span>
                                <p className="stext-102 cl3 p-t-23">Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.</p>

                                {/* Options: Size, Color, Quantity, Add to Cart */}
                                <div className="p-t-33">
                                    {/* Size Selector */}
                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-203 flex-c-m respon6">Size</div>
                                        <div className="size-204 respon6-next">
                                            {/* Select Size Dropdown */}
                                            <div className="rs1-select2 bor8 bg0">
                                                <select className="js-select2" name="time">
                                                    <option>Choose an option</option>
                                                    <option>Size S</option>
                                                    <option>Size M</option>
                                                    <option>Size L</option>
                                                    <option>Size XL</option>
                                                </select>
                                                <div className="dropDownSelect2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Color Selector */}
                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-203 flex-c-m respon6">Color</div>
                                        <div className="size-204 respon6-next">
                                            {/* Select Color Dropdown */}
                                            <div className="rs1-select2 bor8 bg0">
                                                <select className="js-select2" name="time">
                                                    <option>Choose an option</option>
                                                    <option>Red</option>
                                                    <option>Blue</option>
                                                    <option>White</option>
                                                    <option>Grey</option>
                                                </select>
                                                <div className="dropDownSelect2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Selector */}
                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-204 flex-w flex-m respon6-next">
                                            <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                    <i className="fs-16 zmdi zmdi-minus"></i>
                                                </div>
                                                <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1" />
                                                <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                    <i className="fs-16 zmdi zmdi-plus"></i>
                                                </div>
                                            </div>
                                            {/* Add to Cart Button */}
                                            <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">Add to cart</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media Share Buttons */}
                                <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                    <div className="flex-m bor9 p-r-10 m-r-11">
                                        <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                                            <i className="zmdi zmdi-favorite"></i>
                                        </a>
                                    </div>
                                    {/* Additional Social Media Share Buttons */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description, Additional Information, Reviews Tabs */}
                    <div className="bor10 m-t-50 p-t-43 p-b-40">
                        {/* Tabs */}
                    </div>
                </div>

                {/* Product Information (SKU, Categories) */}
                <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
                    <span className="stext-107 cl6 p-lr-25">SKU: JAK-01</span>
                    <span className="stext-107 cl6 p-lr-25">Categories: Jacket, Men</span>
                </div>
            </section>
        );
    }
}

export default Temp;
