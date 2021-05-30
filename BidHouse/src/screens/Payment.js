import React from 'react'
import { StyleSheet, Text, View,Alert,KeyboardAvoidingView,Platform,SafeAreaView, TouchableOpacity,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native'
import CreditCardForm, { Button,} from 'rn-credit-card'
import { FormProvider, useForm } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons';
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export default function Payment() {

    const formMethods = useForm({
        mode: 'onBlur',
        defaultValues: {
          holderName: '',
          cardNumber: '',
          expiration: '',
          cvv: '',
        },
      })
      const { handleSubmit, formState } = formMethods
    
      function onSubmit() {
        Alert.alert('Success: ' + JSON.stringify(model, null, 2))
      }
    
      return (
          
        
     


        <FormProvider {...formMethods}>
        
         <KeyboardAvoidingView
              style={styles.avoider}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <CreditCardForm
                LottieView={LottieView}
                horizontalStart
                overrides={{
                  labelText: {
                    marginTop: 16,
                  },
                }}
             
             
             
              />
            

            

            </KeyboardAvoidingView>
              
           
            <TouchableOpacity style={styles.button}>
              <Text>Submit</Text>
             </TouchableOpacity>

       
        </FormProvider>
        
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
              },
      avoider: {
        flex: 1,
         padding: 20,
      },
      button: {
        margin: 24,
        marginTop: 0,
        elevation:10,
        height:HEIGHT,
        width:WIDTH,
        marginHorizontal:"4%",

      },

    })