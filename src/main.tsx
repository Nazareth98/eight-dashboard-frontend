import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import { ChatbotContextProvider } from "./contexts/chatbotContext.tsx";
import { CustomerContextProvider } from "./contexts/customerContext.tsx";
import { UserContextProvider } from "./contexts/userContext.tsx";
import { ExchangerContextProvider } from "./contexts/exchangerContext.tsx";
import { StockContextProvider } from "./contexts/stockContext.tsx";
import { ShootingContextProvider } from "./contexts/shootingContext.tsx";
import { OrderContextProvider } from "./contexts/orderContext.tsx";
import { ContactsContextProvider } from "./contexts/contactsContext.tsx";
import { BillToPayContextProvider } from "./contexts/billToPayContext.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AnalyticsContextProvider } from "./contexts/analyticsContext.tsx";
import { OverviewContextProvider } from "./contexts/overviewContext.tsx";
import { GoalsContextProvider } from "./contexts/goalsContext.tsx";
import { SheetsContextProvider } from "./contexts/sheetsContext.tsx";
import { ProductAnalysisProvider } from "./contexts/productsAnalysisContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatbotContextProvider>
        <CustomerContextProvider>
          <UserContextProvider>
            <ExchangerContextProvider>
              <StockContextProvider>
                <ShootingContextProvider>
                  <OrderContextProvider>
                    <ContactsContextProvider>
                      <BillToPayContextProvider>
                        <AnalyticsContextProvider>
                          <OverviewContextProvider>
                            <GoalsContextProvider>
                              <SheetsContextProvider>
                                <ProductAnalysisProvider>
                                  <App />
                                </ProductAnalysisProvider>
                              </SheetsContextProvider>
                            </GoalsContextProvider>
                          </OverviewContextProvider>
                        </AnalyticsContextProvider>
                      </BillToPayContextProvider>
                    </ContactsContextProvider>
                  </OrderContextProvider>
                </ShootingContextProvider>
              </StockContextProvider>
            </ExchangerContextProvider>
          </UserContextProvider>
        </CustomerContextProvider>
      </ChatbotContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
