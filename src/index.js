import {View, Text, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

const Otp = ()=>{
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
        //setPhoneNumber('');

    };

    const confirmCode = async () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        
        /*firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('');
            })
            .catch((error) => {
                console.log("I am at error: " + error.message);
                alert(error);
            })*/
        
        try{
            const response = await firebase.auth().signInWithCredential(credential);
            console.log("Response: "+ JSON.stringify(response));
            Alert.alert('Login successful');
        }
        catch(error)
        {
            console.log("I am at error: " + error.message);
            Alert.alert("Login failed");
        }
        
    }

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            >
            </FirebaseRecaptchaVerifierModal>

            <Text style={styles.otpText}>
                Login using OTP
            </Text>

            <TextInput
                placeholder='Phonenumber with country code'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.textInput}
            ></TextInput>

            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.buttonText}>
                    Send verification
                </Text>
            </TouchableOpacity>


            <TextInput
                placeholder='Confirm code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.textInput}
            ></TextInput>

            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text style={styles.buttonText}>
                    Confirm verification
                </Text>
            </TouchableOpacity>


        </View>
    );

}

export default Otp;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    textInput:{
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        marginBottom: 5,
        borderColor: 'red',
        textAlign: 'center',
        color: 'black'
    },
    sendVerification:{
        padding: 20,
        backgroundColor: 'yellow',
        borderRadius: 10
    },
    sendCode:{
        padding: 20,
        backgroundColor: 'yellow',
        borderRadius: 2
    },
    buttonText:{
        textAlign: 'center',
        color: 'grey',
        fontWeight: 'bold'
    },
    otpText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
        margin: 20,
    }
});