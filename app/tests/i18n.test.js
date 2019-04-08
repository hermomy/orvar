import { DEFAULT_LOCALE } from '../containers/App/constants';
import { formatTranslationMessages } from '../i18n';

jest.mock('../translations/en.json', () => (
    {
        message1: 'default message',
        message2: 'default message 2',
    }
));

const esTranslationMessages = {
    message1: 'mensaje predeterminado',
    message2: '',
};

describe('formatTranslationMessages', () => {
    it('Expect build only defaults when DEFAULT_LOCALE', () => {
        const result = formatTranslationMessages(DEFAULT_LOCALE, { a: 'a' });

        expect(result).toEqual({ a: 'a' });
    });


    it('Expect combine default locale and current locale when not DEFAULT_LOCALE', () => {
        const result = formatTranslationMessages('', esTranslationMessages);

        expect(result).toEqual({
            message1: 'mensaje predeterminado',
            message2: 'default message 2',
        });
    });
});
