import './styles/footer.css';

export const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-nav-links'>
                    <ul>
                        <li>Բանկի մասին</li>
                        <li>Նշանակալից մասնակիցներ</li>
                        <li>Բաժնետերեր եւ ներդրողներ</li>
                        <li>Ղեկավարներ</li>
                    </ul>
                    <ul>
                        <li>Դեպի հին կայք</li>
                        <li>Իրավական ակտեր</li>
                        <li>Մատուցվող ծառայություններ</li>
                    </ul>
                    <div className='icons'>
                        <h2>Acme Mobile</h2>
                        <p>Ներբեռնեք հավելվածը</p>
                        <div className='icon-box'>
                        <a rel='noreferrer' href='https://apps.apple.com/ms/app/acme-bank-mobile/id1577370609'
                           target='_blank' className='app_form'>
                            <img src='/img/appstore.svg' title='' alt=''/>
                        </a>
                        <a rel='noreferrer' href='https://apps.apple.com/ms/app/acme-bank-mobile/id1577370609'
                           target='_blank' className='app_form'>
                            <img src='/img/appstore.svg' title='' alt=''/>
                        </a>
                        </div>
                    </div>
                </div>
                <hr></hr>

                <div className='footer-rights'>
                    <p>Բանկը պատասխանատվություն չի կրում հղում կատարած կայքերի բովանդակության ստույգության
                       և արժանահավատության, այնտեղ տեղադրված գովազդների համար, և Բանկը պատասխանատվություն
                       չի կրում այդ կայքերում տեղադրված տեղեկատվության օգտագործման հնարավոր հետևանքների համար:
                    </p>
                    <p>Acme բանկը վերահսկվում է Հայաստանի Կենտրոնական Բանկի կողմից։</p>
                    <p>© 2024, Loremipsum Bank, post@loremipsum.am</p>
                </div>

            </div>
        </footer>
    )
}
