import { Button } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { login } from '../logic/login';
import { Props } from '../types/common/props';
import BaseComponent from '../components/common/BaseComponent';
import { BaseState } from '../types/states/base-state';
import { AutResponse } from '../types/strapi/models/aut-response';
import BsInput from '../components/common/BsInput';
import colors from '../styles/colors';
import { Formik } from 'formik';
import * as yup from 'yup';

export interface LoginState extends BaseState {
  identifier: string;
  password: string;
}

class LoginPage extends BaseComponent<Props> {
  state: LoginState = { identifier: '', password: '', ...this.baseState };

  login = async () => {
    const result = await this.handleRequest<AutResponse>(() =>
      login(this.state.identifier, this.state.password)
    );

    if (result?.data?.jwt) this.props.navigation.navigate('MyTabs');
  };

  render() {
    return (
      <Formik
        initialValues={{ password: '', identifier: '' }}
        onSubmit={values => {
          this.setState({ ...values });
          this.login();
        }}
        validationSchema={yup.object().shape({
          identifier: yup.string().email('E posta geçerli olmalıdır.').required('Email zorunludur.'),
          password: yup.string().min(8, 'Parolo en az 8 karakter olmalıdır.').required('Parola zorunludur.'),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid }) => (
          <View style={styles.container}>
            <BsInput
              value={values.identifier}
              onChangeText={handleChange('identifier')}
              onBlur={() => setFieldTouched('identifier')}
              label="E-Posta"
              rightIcon={{ type: 'meterial', name: 'alternate-email', color: colors.secondColor, size: 20 }}
              errorMessage={errors.identifier ?? this.getErrorMessage(this.state.validations, 'identifier')}
            />

            <BsInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              label="Parola"
              rightIcon={{ type: 'meterial', name: 'lock', color: colors.secondColor, size: 20 }}
              errorMessage={errors.password ?? this.getErrorMessage(this.state.validations, 'password')}
              password
            />
            <Button
              onPress={() => handleSubmit()}
              disabled={!isValid}
              title="Giriş"
              loading={this.state.loading}
              buttonStyle={styles.button}
              titleStyle={{ color: colors.headerTitleColor }}
              size="lg"
              color={colors.secondColor}
            />
          </View>
        )}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  input: { marginBottom: 5 },
  button: { marginHorizontal: 10 },
});

export default LoginPage;
