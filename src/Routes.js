import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import Welcome from "./components/Layout/Welcome";
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props}/>;

const DashboardV1 = lazy(() => import('./components/Dashboard/DashboardV1'));
const DashboardV2 = lazy(() => import('./components/Dashboard/DashboardV2'));
const DashboardV3 = lazy(() => import('./components/Dashboard/DashboardV3'));

const Widgets = lazy(() => import('./components/Widgets/Widgets'));

const Buttons = lazy(() => import('./components/Elements/Buttons'));
const Notifications = lazy(() => import('./components/Elements/Notifications'));
const SweetAlert = lazy(() => import('./components/Elements/SweetAlert'));
const BsCarousel = lazy(() => import('./components/Elements/Carousel'));
const Spinner = lazy(() => import('./components/Elements/Spinner'));
const DropdownAnimation = lazy(() => import('./components/Elements/DropdownAnimation'));
const Nestable = lazy(() => import('./components/Elements/Nestable'));
const Sortable = lazy(() => import('./components/Elements/Sortable'));
const Cards = lazy(() => import('./components/Elements/Cards'));
const Grid = lazy(() => import('./components/Elements/Grid'));
const GridMasonry = lazy(() => import('./components/Elements/GridMasonry'));
const Typography = lazy(() => import('./components/Elements/Typography'));
const FontIcons = lazy(() => import('./components/Elements/FontIcons'));
const WeatherIcons = lazy(() => import('./components/Elements/WeatherIcons'));
const Colors = lazy(() => import('./components/Elements/Colors'));

const ChartFlot = lazy(() => import('./components/Charts/ChartFlot'));
const ChartRadial = lazy(() => import('./components/Charts/ChartRadial'));
const ChartChartJS = lazy(() => import('./components/Charts/ChartChartJS'));
const ChartMorris = lazy(() => import('./components/Charts/ChartMorris'));
const ChartChartist = lazy(() => import('./components/Charts/ChartChartist'));

const MapsGoogle = lazy(() => import('./components/Maps/MapsGoogle'));
const MapsVector = lazy(() => import('./components/Maps/MapsVector'));

const TableStandard = lazy(() => import('./components/Tables/TableStandard'));
const TableExtended = lazy(() => import('./components/Tables/TableExtended'));
const Datatable = lazy(() => import('./components/Tables/DatatableView'));
const DataGrid = lazy(() => import('./components/Tables/DataGrid'));

const FormStandard = lazy(() => import('./components/Forms/FormStandard'));
const FormExtended = lazy(() => import('./components/Forms/FormExtended'));
const FormValidation = lazy(() => import('./components/Forms/FormValidation'));
const FormWizard = lazy(() => import('./components/Forms/FormWizard'));
const FormUpload = lazy(() => import('./components/Forms/FormUpload'));
const FormCropper = lazy(() => import('./components/Forms/FormCropper'));

const Login = lazy(() => import('./components/Pages/Login'));
const Register = lazy(() => import('./components/Pages/Register'));
const Recover = lazy(() => import('./components/Pages/Recover'));
const Lock = lazy(() => import('./components/Pages/Lock'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));
const Error500 = lazy(() => import('./components/Pages/Error500'));
const Maintenance = lazy(() => import('./components/Pages/Maintenance'));

const Mailbox = lazy(() => import('./components/Extras/Mailbox'));
const Timeline = lazy(() => import('./components/Extras/Timeline'));
const Calendar = lazy(() => import('./components/Extras/Calendar'));
const Invoice = lazy(() => import('./components/Extras/Invoice'));
const Search = lazy(() => import('./components/Extras/Search'));
const Todo = lazy(() => import('./components/Extras/Todo'));
const Profile = lazy(() => import('./components/Extras/Profile'));
const BugTracker = lazy(() => import('./components/Extras/BugTracker'));
const ContactDetails = lazy(() => import('./components/Extras/ContactDetails'));
const Contacts = lazy(() => import('./components/Extras/Contacts'));
const Faq = lazy(() => import('./components/Extras/Faq'));
const FileManager = lazy(() => import('./components/Extras/FileManager'));
const Followers = lazy(() => import('./components/Extras/Followers'));
const HelpCenter = lazy(() => import('./components/Extras/HelpCenter'));
const Plans = lazy(() => import('./components/Extras/Plans'));
const ProjectDetails = lazy(() => import('./components/Extras/ProjectDetails'));
const Projects = lazy(() => import('./components/Extras/Projects'));
const Settings = lazy(() => import('./components/Extras/Settings'));
const SocialBoard = lazy(() => import('./components/Extras/SocialBoard'));
const TeamViewer = lazy(() => import('./components/Extras/TeamViewer'));
const VoteLinks = lazy(() => import('./components/Extras/VoteLinks'));

const EcommerceOrder = lazy(() => import('./components/Ecommerce/EcommerceOrders'));
const EcommerceOrderView = lazy(() => import('./components/Ecommerce/EcommerceOrderView'));
const EcommerceProduct = lazy(() => import('./components/Ecommerce/EcommerceProducts'));
const EcommerceProductView = lazy(() => import('./components/Ecommerce/EcommerceProductView'));
const EcommerceCheckout = lazy(() => import('./components/Ecommerce/EcommerceCheckout'));

const BlogList = lazy(() => import('./components/Blog/BlogList'));
const BlogPost = lazy(() => import('./components/Blog/BlogPost'));
const BlogArticle = lazy(() => import('./components/Blog/BlogArticles'));
const BlogArticleView = lazy(() => import('./components/Blog/BlogArticleView'));

const ForumHome = lazy(() => import('./components/Forum/ForumHome'));

const BrandReportPage = lazy(() => import("./components/Report/BrandReport/BrandReportPage"));
const BrandReportManagementPage = lazy(() => import("./components/Report/BrandReport/BrandReportManagementPage"));
const CommentApplicationPage = lazy(() => import("./components/Report/Comment/CommentApplicationPage"));
const CommentManagementPage = lazy(() => import("./components/Report/Comment/CommentManagementPage"));
const IndustryReportPage = lazy(() => import("./components/Report/IndustryReport/IndustryReportPage"));
const IndustryReportManagementPage = lazy(() => import("./components/Report/IndustryReport/IndustryReportManagementPage"));
const IndexManagementPage = lazy(() => import("./components/Index/IndexManagementPage"));
const CollectionManagementPage = lazy(() => import("./components/Report/BrandReport/CollectionManagementPage"));
const CollectionPage = lazy(() => import("./components/Report/BrandReport/CollectionPage"));
const Questionnaire = lazy(() => import("./components/Report/Questionnaire/Questionnaire"));

const WordMouthAdd = lazy(() => import("./components/WordMouth/WordMouthAdd"));
const WordMouthGenerate = lazy(() => import("./components/WordMouth/WordMouthGenerate"));
const ProductWordOfMouthView = lazy(() => import("./components/WordMouth/WordMouthView/ProductWordOfMouthView"));

// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/login',
    '/register',
    '/recover',
    '/lock',
    '/notfound',
    '/error500',
    '/maintenance'
];

const Routes = ({location}) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = {enter: 500, exit: 500};

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        <Route path="/login" component={waitFor(Login)}/>
                        <Route path="/register" component={waitFor(Register)}/>
                        <Route path="/recover" component={waitFor(Recover)}/>
                        <Route path="/lock" component={waitFor(Lock)}/>
                        <Route path="/notfound" component={waitFor(NotFound)}/>
                        <Route path="/error500" component={waitFor(Error500)}/>
                        <Route path="/maintenance" component={waitFor(Maintenance)}/>
                    </Switch>
                </Suspense>
            </BasePage>
        )
    } else {
        return (
            // Layout component wrapper
            // Use <BaseHorizontal> to change layout
            <Base>
                <TransitionGroup>
                    <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                        <div>
                            <Suspense fallback={<PageLoader/>}>
                                <Switch location={location}>

                                    {/*Dashboard*/}
                                    <Route path="/dashboardv1" component={waitFor(DashboardV1)}/>
                                    <Route path="/dashboardv2" component={waitFor(DashboardV2)}/>
                                    <Route path="/dashboardv3" component={waitFor(DashboardV3)}/>

                                    {/*Widgets*/}
                                    <Route path="/widgets" component={waitFor(Widgets)}/>

                                    {/*Elements*/}
                                    <Route path="/buttons" component={waitFor(Buttons)}/>
                                    <Route path="/notifications" component={waitFor(Notifications)}/>
                                    <Route path="/sweetalert" component={waitFor(SweetAlert)}/>
                                    <Route path="/carousel" component={waitFor(BsCarousel)}/>
                                    <Route path="/spinners" component={waitFor(Spinner)}/>
                                    <Route path="/dropdown" component={waitFor(DropdownAnimation)}/>
                                    <Route path="/nestable" component={waitFor(Nestable)}/>
                                    <Route path="/sortable" component={waitFor(Sortable)}/>
                                    <Route path="/cards" component={waitFor(Cards)}/>
                                    <Route path="/grid" component={waitFor(Grid)}/>
                                    <Route path="/grid-masonry" component={waitFor(GridMasonry)}/>
                                    <Route path="/typography" component={waitFor(Typography)}/>
                                    <Route path="/icons-font" component={waitFor(FontIcons)}/>
                                    <Route path="/icons-weather" component={waitFor(WeatherIcons)}/>
                                    <Route path="/colors" component={waitFor(Colors)}/>

                                    {/*Forms*/}
                                    <Route path="/form-standard" component={waitFor(FormStandard)}/>
                                    <Route path="/form-extended" component={waitFor(FormExtended)}/>
                                    <Route path="/form-validation" component={waitFor(FormValidation)}/>
                                    <Route path="/form-wizard" component={waitFor(FormWizard)}/>
                                    <Route path="/form-upload" component={waitFor(FormUpload)}/>
                                    <Route path="/form-cropper" component={waitFor(FormCropper)}/>

                                    {/*Charts*/}
                                    <Route path="/chart-flot" component={waitFor(ChartFlot)}/>
                                    <Route path="/chart-radial" component={waitFor(ChartRadial)}/>
                                    <Route path="/chart-chartjs" component={waitFor(ChartChartJS)}/>
                                    <Route path="/chart-morris" component={waitFor(ChartMorris)}/>
                                    <Route path="/chart-chartist" component={waitFor(ChartChartist)}/>

                                    {/*Table*/}
                                    <Route path="/table-standard" component={waitFor(TableStandard)}/>
                                    <Route path="/table-extended" component={waitFor(TableExtended)}/>
                                    <Route path="/table-datatable" component={waitFor(Datatable)}/>
                                    <Route path="/table-datagrid" component={waitFor(DataGrid)}/>

                                    {/*Maps*/}
                                    <Route path="/map-google" component={waitFor(MapsGoogle)}/>
                                    <Route path="/map-vector" component={waitFor(MapsVector)}/>

                                    {/*Extras*/}
                                    <Route path="/mailbox" component={waitFor(Mailbox)}/>
                                    <Route path="/timeline" component={waitFor(Timeline)}/>
                                    <Route path="/calendar" component={waitFor(Calendar)}/>
                                    <Route path="/invoice" component={waitFor(Invoice)}/>
                                    <Route path="/search" component={waitFor(Search)}/>
                                    <Route path="/todo" component={waitFor(Todo)}/>
                                    <Route path="/profile" component={waitFor(Profile)}/>
                                    <Route path="/ecommerce-orders" component={waitFor(EcommerceOrder)}/>
                                    <Route path="/ecommerce-order-view" component={waitFor(EcommerceOrderView)}/>
                                    <Route path="/ecommerce-products" component={waitFor(EcommerceProduct)}/>
                                    <Route path="/ecommerce-product-view" component={waitFor(EcommerceProductView)}/>
                                    <Route path="/ecommerce-checkout" component={waitFor(EcommerceCheckout)}/>
                                    <Route path="/blog-list" component={waitFor(BlogList)}/>
                                    <Route path="/blog-post" component={waitFor(BlogPost)}/>
                                    <Route path="/blog-articles" component={waitFor(BlogArticle)}/>
                                    <Route path="/blog-article-view" component={waitFor(BlogArticleView)}/>
                                    <Route path="/bug-tracker" component={waitFor(BugTracker)}/>
                                    <Route path="/contact-details" component={waitFor(ContactDetails)}/>
                                    <Route path="/contacts" component={waitFor(Contacts)}/>
                                    <Route path="/faq" component={waitFor(Faq)}/>
                                    <Route path="/file-manager" component={waitFor(FileManager)}/>
                                    <Route path="/followers" component={waitFor(Followers)}/>
                                    <Route path="/help-center" component={waitFor(HelpCenter)}/>
                                    <Route path="/plans" component={waitFor(Plans)}/>
                                    <Route path="/project-details" component={waitFor(ProjectDetails)}/>
                                    <Route path="/projects" component={waitFor(Projects)}/>
                                    <Route path="/settings" component={waitFor(Settings)}/>
                                    <Route path="/social-board" component={waitFor(SocialBoard)}/>
                                    <Route path="/team-viewer" component={waitFor(TeamViewer)}/>
                                    <Route path="/vote-links" component={waitFor(VoteLinks)}/>

                                    <Route path="/forum" component={waitFor(ForumHome)}/>

                                    {/*品牌报告*/}
                                    <Route path="/brand-report" exact={true}
                                           component={waitFor(BrandReportManagementPage)}/>
                                    <Route path="/brand-report/:id" component={waitFor(BrandReportPage)}/>
                                    <Route path="/comment-application" component={waitFor(CommentApplicationPage)}/>
                                    <Route path="/brand-report-comment" component={waitFor(CommentManagementPage)}/>
                                    <Route path="/industry-report/:id" component={waitFor(IndustryReportPage)}/>
                                    <Route path="/industry-report" exact={true}
                                           component={waitFor((IndustryReportManagementPage))}/>
                                    <Route path="/collection" exact={true}
                                           component={waitFor((CollectionManagementPage))}/>
                                    <Route path="/collection/:id" component={waitFor(CollectionPage)}/>
                                    <Route path="/questionnaire" component={waitFor(Questionnaire)}/>

                                    {/*指标管理*/}
                                    <Route path="/index" exact={true} component={waitFor(IndexManagementPage)}/>

                                    {/*/!*口碑分析*!/*/}
                                    <Route path="/wordMouth-productlist" exact={true}
                                           component={waitFor(WordMouthGenerate)}/>
                                    <Route path="/wordMouth-productlist/:product"
                                           component={waitFor(ProductWordOfMouthView)}/>
                                    <Route path="/wordMouth-productadd" component={waitFor(WordMouthAdd)}/>

                                    {/*欢迎页*/}
                                    <Route path="/welcome" component={Welcome}/>

                                    <Redirect to="/welcome"/>
                                </Switch>
                            </Suspense>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Base>
        );
    }
}

export default withRouter(Routes);
