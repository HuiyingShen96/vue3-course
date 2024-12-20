// 表单组件 实例的数据类型
export interface FormInstance {
  resetFields(): void;
  addField(field: FormItemContext): void;
}

// 表单字段组件 实例的数据类型
export interface FormItemInstance {
  resetField?: () => void;
  validateField(): Promise<ValidateResult>;
}

// 表单字段组件 内置数据类型
export interface FormItemContext extends FormItemInstance {
  label?: string;
  name?: string;
  rule?: ValidateRule;
}

// 表单组件 共享数据类型
export interface FormContext extends FormInstance {
  model?: {
    [key: string]: unknown;
  };
  formInstance?: FormInstance;
}

// 校验结果数据类型
export interface ValidateResult {
  hasError: boolean;
  name?: string;
  value?: unknown;
  message?: string;
}

// 校验规则数据类型
export interface ValidateRule {
  // 字段校验方法
  validator?: (value: unknown) => ValidateResult | Promise<ValidateResult>;
}