import { Button } from '@rneui/base';
import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BaseComponent from '../components/common/BaseComponent';
import { register } from '../logic/register';
import { Props } from '../types/common/props';
import { BaseState } from '../types/states/base-state';
import Toast from 'react-native-toast-message';
import { User } from '../types/strapi/models/user';
import BsInput from '../components/common/BsInput';
import colors from '../styles/colors';
import { Formik } from 'formik';
import * as yup from 'yup';

export interface RegisterPageStates extends BaseState {
  user: User | null;
}

export default class RegisterPageComponent extends BaseComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  state: RegisterPageStates = { user: null, ...this.baseState };

  registerSubmit = async () => {
    if (this.state.user == null) {
      Toast.show({
        type: 'error',
        text2: 'Lütfen boş alanları doldurunuz.',
        position: 'bottom',
      });

      return;
    }

    const result = await this.handleRequest<User>(() => register(this.state.user), 'Başarılı');

    if (result?.data) {
      Toast.show({
        type: 'success',
        text2: 'Başarılı',
        position: 'top',
      });
      this.setState({ user: null });
      this.props.navigation.navigate('Login');
    }
  };

  public render() {
    const initialValues: User = {
      blocked: false,
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      username: '',
      confirmed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          this.setState({ user: values });
          this.registerSubmit();
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email('E posta geçerli olmalıdır.').required('Email zorunludur.'),
          password: yup.string().min(8, 'Parolo en az 8 karakter olmalıdır.').required('Parola zorunludur.'),
          firstname: yup
            .string()
            .min(1, 'Ad en az 1 karakter olmaladır.')
            .max(25, 'Ad en fazla 20 karakter olmalıdır.')
            .required('Ad zorunludur.'),
          lastname: yup
            .string()
            .min(1, 'Soyad en az 1 karakter olmaladır.')
            .max(25, 'Soyad en fazla 20 karakter olmalıdır.')
            .required('Soyad zorunludur.'),
          username: yup
            .string()
            .min(5, 'Kullanıcı Adı en az 5 karakter olmaladır.')
            .max(20, 'Kullanıcı Adı en fazla 20 karakter olmalıdır.')
            .required('Kullanıcı Adı zorunludur.'),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid }) => (
          <View style={styles.container}>
            <BsInput
              value={values.firstname}
              onChangeText={handleChange('firstname')}
              onBlur={() => setFieldTouched('firstname')}
              label="Ad"
              rightIcon={{ type: 'meterial', name: 'person', color: colors.secondColor, size: 20 }}
              errorMessage={errors.firstname ?? this.getErrorMessage(this.state.validations, 'firstname')}
            />
            <BsInput
              value={values.lastname}
              onChangeText={handleChange('lastname')}
              onBlur={() => setFieldTouched('lastname')}
              label="Soyad"
              rightIcon={{ type: 'meterial', name: 'person', color: colors.secondColor, size: 20 }}
              errorMessage={errors.lastname ?? this.getErrorMessage(this.state.validations, 'lastName')}
            />

            <BsInput
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={() => setFieldTouched('username')}
              label="Kullanıcı Adı"
              rightIcon={{ type: 'meterial', name: 'alternate-email', color: colors.secondColor, size: 20 }}
              errorMessage={errors.username ?? this.getErrorMessage(this.state.validations, 'username')}
            />

            <BsInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              label="E-Posta"
              rightIcon={{ type: 'meterial', name: 'email', color: colors.secondColor, size: 20 }}
              errorMessage={errors.email ?? this.getErrorMessage(this.state.validations, 'email')}
            />

            <BsInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              label="Parola"
              rightIcon={{ type: 'meterial', name: 'lock', color: colors.secondColor, size: 20 }}
              errorMessage={errors.password ?? this.getErrorMessage(this.state.validations, 'email')}
              password
            />
            <BsInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              label="Parola Tekrar"
              rightIcon={{ type: 'meterial', name: 'lock', color: colors.secondColor, size: 20 }}
              errorMessage={errors.password ?? this.getErrorMessage(this.state.validations, 'email')}
              password
            />

            <Button
              title="Kaydet"
              disabled={!isValid}
              color={colors.secondColor}
              titleStyle={{ color: colors.headerTitleColor }}
              buttonStyle={styles.button}
              onPress={() => handleSubmit()}
              size="lg"
              loading={this.state.loading}
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
  button: { marginHorizontal: 10, marginVertical: 20 },
});
