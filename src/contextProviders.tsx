// contexts/AllProviders.tsx

import React from "react";
import { ChatbotContextProvider } from "./contexts/chatbotContext";
import { CustomerContextProvider } from "./contexts/customerContext";
import { UserContextProvider } from "./contexts/userContext";
import { ExchangerContextProvider } from "./contexts/exchangerContext";
import { StockContextProvider } from "./contexts/stockContext";
import { ShootingContextProvider } from "./contexts/shootingContext";
import { OrderContextProvider } from "./contexts/orderContext";
import { ContactsContextProvider } from "./contexts/contactsContext";
import { BillToPayContextProvider } from "./contexts/billToPayContext";
import { AnalyticsContextProvider } from "./contexts/analyticsContext";
import { OverviewContextProvider } from "./contexts/overviewContext";
import { GoalsContextProvider } from "./contexts/goalsContext";
import { ProductAnalysisProvider } from "./contexts/productsAnalysisContext";
import { ProvidersContextProvider } from "./contexts/providersContext";
import { AuthContextProvider } from "./contexts/authContext";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
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
                              <ProductAnalysisProvider>
                                <ProvidersContextProvider>
                                  {children}
                                </ProvidersContextProvider>
                              </ProductAnalysisProvider>
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
  );
};

export default AllProviders;
