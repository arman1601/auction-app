export const validation = (elem,type) => {
    const htmlTagsRegex = /(<([^>]+)>)/gi;

    if (!htmlTagsRegex.test(elem) || elem === 'undefined') {
        if (type === 'email') {
            if (elem.includes('.') && elem.includes('@')) {
                return true;
            }else {
                return 'Please enter a valid email adress';
            };
        }else if (type === 'password') {
            if (elem.length > 6 ) {
                return true;
            }else {
                return 'password length is lower 6';
            };
        }else if (type === 'username') {
            if (elem.length >= 3 && elem.length <= 30) {
                return true;
            }else {
                return 'username length is lower then 3 or higher 30 symbols';
            };
        };
    }else {
        return 'Your input has contain html tags or your input is empty';
    };

};