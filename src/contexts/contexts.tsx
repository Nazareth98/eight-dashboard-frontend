// contexts/AllProviders.tsx

import React from "react";
import { ChatbotContextProvider } from "./chatbotContext";
import { CustomerContextProvider } from "./customerContext";
import { UserContextProvider } from "./userContext";
import { ExchangerContextProvider } from "./exchangerContext";
import { StockContextProvider } from "./stockContext";
import { OrderContextProvider } from "./orderContext";
import { BillToPayContextProvider } from "./billToPayContext";
import { AnalyticsContextProvider } from "./analyticsContext";
import { OverviewContextProvider } from "./overviewContext";
import { GoalsContextProvider } from "./goalsContext";
import { ProductAnalysisProvider } from "./productsAnalysisContext";
import { ProvidersContextProvider } from "./providersContext";
import { AuthContextProvider } from "./authContext";

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
                <OrderContextProvider>
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
                </OrderContextProvider>
              </StockContextProvider>
            </ExchangerContextProvider>
          </UserContextProvider>
        </CustomerContextProvider>
      </ChatbotContextProvider>
    </AuthContextProvider>
  );
};

export default AllProviders;
