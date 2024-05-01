import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import logo from '/logo.jpeg';

const HodApprovedPrint = ({ data }) => {
    const approvedTime = data.approvedTime || null;
    const department = data.department || null;
    const hodFirstName = data.hodFirstName || null;
    const requestDate = data.requestDate || null;
    const examName = data.examName || null;
    const hodLastName = data.hodLastName || null;
    const approvedDate = data.approvedDate || null;
    const hall = data.hall || null;
    const requestTime = data.requestTime || null;
    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },

        titleContainer: { flexDirection: 'row', marginTop: 24 },

        // logo: { width: 90 },

        reportTitle: { fontSize: 16, textAlign: 'center' },

        addressTitle: { fontSize: 11, fontStyle: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        examName: { fontSize: 11, fontWeight: 'bold' },

        address: { fontWeight: 400, fontSize: 10 },

        theader: { marginTop: 20, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

        theader2: { flex: 1, borderRightWidth: 0, borderBottomWidth: 1 },

        tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

        total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

        tbody2: { flex: 1, borderRightWidth: 1, }
    });

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            {/* <Image style={styles.logo} src={logo} /> */}
            <View style={[styles.spaceBetween, { marginLeft: 200 }]}>
                <Text style={[styles.reportTitle, { fontSize: 24, fontWeight: 'bold' }]}>DUTY LIST</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {/* <Text style={{ marginLeft: 10 }}>Date: {dt}</Text>
                    <Text style={{ marginLeft: 10 }}>Time: {tm}</Text> */}
                </View>
            </View>
        </View>
    );
    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>{hall} </Text>
                    <Text style={styles.examName}>Exam : {examName} </Text>
                </View>
                <View>
                    <Text style={styles.addressTitle}> </Text>
                    <Text style={styles.addressTitle}></Text>
                    <Text style={styles.addressTitle}></Text>
                </View>
            </View>
        </View>
    );
    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.addressTitle}>Request Date : {requestDate} </Text>
                    {/* <Text style={styles.addressTitle}>{hodFirstName} {
                        hodLastName}</Text>
                    <Text style={styles.addressTitle}>{approvedTime},{
                        requestTime}</Text>
                    <Text style={styles.addressTitle}>{department},{pincode}</Text> */}
                </View>
                <Text style={styles.addressTitle}>Approved Date : {approvedDate}</Text>
            </View>
        </View>
    );

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={[styles.theader, styles.theader2]}>
                <Text >First Name</Text>
            </View>
            <View style={styles.theader}>
                <Text>Last Name</Text>
            </View>
            <View style={styles.theader}>
                <Text>Email</Text>
            </View>
            <View style={styles.theader}>
                <Text>Notified</Text>
            </View>

        </View>
    );

    const TableBody = () => (
        Array.isArray(data.selectedTeachers) ? (
            data.selectedTeachers.map((item) => (
                <View style={{ width: '100%', flexDirection: 'row' }} key={item.productId}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text>{item.fName}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item.lName}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item.email}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item.status === 1 ? "Yes" : "No"}</Text>
                    </View>
                </View>
            ))
        ) : (
            <Text>No data available</Text>
        )
    );




    const TableTotal = () => {


        return (
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={styles.total}>
                    <Text></Text>
                </View>
                <View style={styles.total}>
                    <Text> </Text>
                </View>
                <View style={styles.tbody}>
                    <Text>Approved By </Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{hodFirstName} {hodLastName}</Text>
                </View>
            </View>
        );
    };





    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <UserAddress />
                <TableHead />
                <TableBody />
                <TableTotal />
            </Page>
        </Document>
    );
}

export default HodApprovedPrint;
