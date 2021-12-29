import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'react-google-charts';
import { Link } from "react-router-dom";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { summaryOrder } from '../actions/orderActions';
import { detailsUser } from '../actions/userActions';

function SellerDashboardScreen(props) {
  const sellerId = props.match.params.id;
  const orderSummary = useSelector((state) => state.orderSummary);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, summary, error } = orderSummary;
  const { user } = userDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser({name:userInfo.name}));
    dispatch(summaryOrder({ seller: sellerId }));
  }, [dispatch, sellerId]);

  return (
    <div>
      <div className="row" id="dash">
        <h1 id="dash1">Seller Dashboard</h1>

      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
           
            

            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Orders
                </span>
              </div>
              <div className="summary-body">
                {(summary).user?.seller.orders[0] ? (summary).user?.seller.orders[0].numOrders : 0}
              </div>
            
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Sales
                </span>
              </div>
              <div className="summary-body">
                
                {(summary).user?.seller.orders[0]
                  ? (summary).user?.seller.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div className="area">
            <div className="area1">
              <h2 id="sale">Sales</h2>
              {(summary).user?.seller.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    {...summary.seller?.seller.dailyOrders.map((x) => [x._id, x.sales])},
                  ]}
                />
              )}
            </div>
            <div className="pie">
              <h2 id="sale">Categories</h2>
              {summary.seller?.seller.productCategories.length === 0 ? (
                <MessageBox>No Category</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Category', 'Products'],
                    {...summary.seller?.seller.productCategories.map((x) => [x._id, x.count])},
                  ]}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default SellerDashboardScreen;