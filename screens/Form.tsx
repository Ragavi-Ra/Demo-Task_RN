import React, { useState } from 'react'
import { Button, Text, TextInput, View, Alert } from 'react-native'
import config from '../config'
import axios from 'axios'

const Form = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const value = async() => {
        try{
            const response = await axios.get(`${config.API_URL}/companydropdown`)
            console.log('Companies:', response.data);
        }
        catch(err){
            console.log('Error fetching companies:', err)
        }
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${config.API_URL}/companies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, address, state, email, phone }),
            });

            const data = await response.json();
            console.log('Response status:', response.status);
    console.log('Response data:', data);


            if (response.ok) {
                Alert.alert('Success', 'Added successfully!');
                value()
                setName('');
                setAddress('');
                setState('');
                setEmail('');
                setPhone('');
                // navigation.navigate('Login');
            } else {
                Alert.alert('Data insertion failed', data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Network Error', 'Unable to connect to the server.');
        }
    }
    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
            <Text>Company name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
            <Text>Address</Text>
            <TextInput
                value={address}
                onChangeText={setAddress}
            />
            <Text>State</Text>
            <TextInput
                value={state}
                onChangeText={setState}
            />
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
            />
            <Text>Phone Number</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
            />
            <Button
                title='Submit'
                onPress={handleSubmit}
            />
        </View>
    )
}

export default Form