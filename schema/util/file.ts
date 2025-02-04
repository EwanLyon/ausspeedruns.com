import { file as k6File, FileFieldConfig } from '@keystone-6/core/fields';
import { AzureStorageConfig, azureStorageFile } from '@k6-contrib/fields-azure';
import { BaseListTypeInfo } from '@keystone-6/core/types';

const azureConfig: AzureStorageConfig = {
	azureStorageOptions: {
		account: process.env.AZURE_STORAGE_ACCOUNT_NAME,
		accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
		container: process.env.AZURE_STORAGE_CONTAINER,
	},
}

export function file<ListTypeInfo extends BaseListTypeInfo>(config?: FileFieldConfig<ListTypeInfo>) {
	return process.env.NODE_ENV === 'production' ? azureStorageFile({azureStorageConfig: azureConfig, ...config}) : k6File(config);
}
