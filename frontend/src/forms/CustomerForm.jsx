import { Form, Input, Button, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { validatePhoneNumber } from '@/utils/helpers';

import useLanguage from '@/locale/useLanguage';

export default function CustomerForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label={translate('company')}
        name="company"
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('Manager first Name')}
        name="managerName"
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('Manager Last Name')}
        name="managerSurname"
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label={translate('Phone')}
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
          {
            pattern: validatePhoneNumber,
            message: 'Please enter a valid phone number',
          },
          
        ]}
      >
        <Input />
      </Form.Item>
       {/* SEÇÃO DE CONTATOS EXTRAS (LISTA DINÂMICA) */}
      <Divider orientation="left">Outros Contatos / Telefones</Divider>

      <Form.List name="contacts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Falta o nome' }]}
                >
                  <Input placeholder="Nome do Contato (ex: Financeiro)" />
                </Form.Item>
                
                <Form.Item
                  {...restField}
                  name={[name, 'phone']}
                  rules={[{ required: true, message: 'Falta o telefone' }]}
                >
                  <Input placeholder="Telefone" />
                </Form.Item>
                
                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
              </Space>
            ))}
            
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Adicionar Novo Telefone
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        name="email"
        label={translate('email')}
        rules={[
          {
            type: 'email',
          },
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
          {/* SEÇÃO DE NOTA FISCAL */}
      <Divider orientation="left">Dados para Nota Fiscal</Divider>
      
      <Form.Item label="Razão Social / Nome (NF)" name={['invoiceDetails', 'name']}>
        <Input placeholder="Nome para a nota" />
      </Form.Item>

      <Form.Item label="CNPJ" name={['invoiceDetails', 'cnpj']}>
        <Input placeholder="00.000.000/0000-00" />
      </Form.Item>

      <Form.Item label="CEP" name={['invoiceDetails', 'cep']}>
        <Input placeholder="00000-000" />
      </Form.Item>

      <Form.Item label="Endereço de Cobrança" name={['invoiceDetails', 'address']}>
        <Input placeholder="Rua, Número, Bairro" />
      </Form.Item>

    </>
  );
}
